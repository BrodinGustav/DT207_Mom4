//Routes for auth

const express = require("express");
const router = express.Router();                //Tillgång till routern som installerades för användning till anrop
const mongoose = require("mongoose");
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
        }

        //Correct input - save user
        //OBS! Här läggs koden för lagring till databas! 
        const user = new User({ username, password });          //Använder userSchema från models/user för lagring av ny användare
        await user.save();

        res.status(200).json({message: "User created"});

   }catch(error){
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

        //Check credentials (OBS! Korregera så det ej är bestämda värden!)
        if(username === "Gustav" && password === "1234") {
            res.status(200).json({message: "Login successful"});
        }else{
            res.status(401).json({error: "Invalid username/password"});
        }

    }catch(error) {
            res.status(500).json({error: "Server error"});
        }
});

module.exports = router;                        //Lägger all kod till app.use i server.js


