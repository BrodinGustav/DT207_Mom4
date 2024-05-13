//Routes for auth

const express = require("express");
const router = express.Router();                //Tillgång till routern som installerades för användning till anrop
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Anslutning till mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to mongoDB");
}).catch((error) => {
    console.error("Error connecting to database" + error);
})

//User model
const User = require("./models/User");

//Skapa ny användare
router.post("/register", async (req, res) => {
   try {
        const {username, password } = req.body;   //Läser in vad vi får skickat i requesten till aktuell URL

        //Validera input
        if(!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password"});      //OBS! Skapa error-array som lagrar de olika felmeddelandena!
        }else{

        //Correct input - save user
        const user = new User({ username, password });          //Använder userSchema från models/user för lagring av ny användare
        await user.save();

        res.status(200).json({message: "User created"});
    }
   }catch(error){
    console.error("Server error:", error);
    res.status(500).json({error: "Server error"} + error);
   }
});

//Logga in användare
router.post("/login", async (req, res) => {
        try{
            const {username, password } = req.body;   

            //Validera input
        if(!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password"});      //OBS! Skapa error-array som lagrar de olika felmeddelandena!
        }

        //Finns användare?
        const user = await User.findOne( { username: username });

        if(!user) {
            return res.status(401).json({ error: "Incorrect username/password"});                   //OBS Lägg till error i array för utskrivning till användare
        }

        //Kolla lösenord
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            return res.status(401).json({ error: "Incorrect username/password"});
        } else {
            //Skapa JWT
            const payload = { username: username };                                                  //Användare lagras i JWT:n
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '8h'});
            res.status(200).json({message: "Inloggad!", token});
        }

    }catch(error) {
            res.status(500).json({error: "Server error"});
        }

    });

// Hämta alla användare
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Uppdatera användarens lösenord
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        // Validera input
        if (!password) {
            return res.status(400).json({ error: "Invalid input, send password" });
        }

        // Uppdatera lösenord
        await User.findByIdAndUpdate(id, { password });

        res.status(200).json({ message: "User password updated" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Ta bort användare
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Ta bort användaren
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


    module.exports = router;                        //Lägger all kod till app.use i server.js


