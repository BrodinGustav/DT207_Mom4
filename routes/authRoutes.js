//Routes for auth

const express = require("express");
const router = express.Router();                //Tillgång till routern som installerades för användning till anrop


//Skapa ny användare
router.post("/register", async (req, res) => {
    console.log("Register call...");
});


//Logga in användare
router.post("/login", async (req, res) => {
    console.log("Login call...")
});

module.exports = router;                        //Lägger all kod till app.use i server.js


