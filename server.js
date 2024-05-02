//Applikation för registrering och inloggning

//Serverinställningar
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//Start applikation
app.listen(port, () => {
    console.log(`Server running att http//:localhost:${port}`);
})
