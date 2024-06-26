//Applikation för registrering och inloggning

//Serverinställningar
const express = require("express");
const bodyParser = require("body-parser");              //Möjiggör för formulärhanteirng
const cors = require ('cors');                          //Möjliggör korsdomän förfrågningar till servern
const authRoutes = require("./routes/authRoutes");      //Används för autentiseringsrutter     
const jwt = require("jsonwebtoken");                    //Används för JSON Web Token hantering
require("dotenv").config();                             

const app = express();                                  //Skapar instans av express
const port = process.env.PORT || 3000;                  //Anger port
app.use(bodyParser.json());                             //Tolkar inkommande JSON-anrop
app.use(cors());                                        
app.use(express.static('src'));         //Möjliggör för åtkomst av statiska filer (JS, CSS)

//Routes
app.use("/api", authRoutes) //Försöker användare gå in på URLen så skickas den vidare till routen. 

//Skyddad route
app.get("/api/protected", authenticateToken, (req, res) => {        //Route som kollar om token är korrekt
    res.json({message: "Skyddad route"});
   });          

//Validera Token
function authenticateToken(req, res, next) {                   //authenticateToken används som middleware som kontroll ifall token är korrekt
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];       //Tar bort "bearer" + mellanslag och använder bara själva token

    if (token == null) res.status(401).json({message : "Nekad åtkomst - token saknas"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {          //Metod för att verifiera JWT med argumenten token & secret_key. Verifieras mot den hemliga nyckeln
    
    if(err) return res.status(403).json({message: "Ogiltig JWT"});

    req.username = username;
    next();                                                                     //Om verifiering godkänd skickas användaren till /api/protected
    });

}                      

//Start applikation
app.listen(port, () => {
    console.log(`Server running att http//:localhost:${port}`);
})

