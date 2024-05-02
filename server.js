//Applikation för registrering och inloggning

//Serverinställningar
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes) //Försöker användare gå in på URLen så skickas den vidare till routen. 


//Start applikation
app.listen(port, () => {
    console.log(`Server running att http//:localhost:${port}`);
})
