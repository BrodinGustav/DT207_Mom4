/*User-scheama och metoder för registrering och log in*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true //Här kan längd etc tilläggas
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Hasha lösen innan lagring (Ska köras innan userSchema)
userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch(error) {
            next(error);
        }
});

//Registrera User
userSchema.statics.register = async function (username, password) {
    try  {
        const user = new this ({ username, password });
        await user.save();                                      //User lagras i databasen
        return user;
    } catch(error) {
        throw error;
    }
};

//Metod för att jämföra inmatad lösenord med det hashed lösenord 
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);   //Inmatad lösen jämförs med hashad lösen som är sparat i userSchema
    
    }catch (error){
        throw error;
    }
}

//Metod för inloggning
userSchema.statics.login = async function(username, password) {
    try{
        const user = await this.findOne({ username });                 //Kontrollerar ifall användare finns

        if(!user){
            throw new Error("Incorrect username/password");
        }

        const isPasswordMatched = await user.comparePassword(password);    

        //Inccorrect? 
        if(!isPasswordMatched) {
            throw new Error("Incorrect username/password");
        }

        //Correct 
        return user;

    }catch(error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;


