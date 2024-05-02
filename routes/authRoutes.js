//Routes for auth

const express = require("express");
const router = express.Router();                //Tillgång till routern som installerades för användning till anrop


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
        res.status(200).json({message: "User created"});

   }catch(error){
    res.status(500).json({error: "Server error"});
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


