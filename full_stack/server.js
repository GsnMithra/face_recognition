const express= require ("express");
require ('./database/db');

const CryptoJS = require ("crypto-js");

const User = require ('./database/user_db');
const cors = require ("cors");

const app = express ();
app.use (cors ());
app.use (express.json ());
app.use (express.urlencoded ({ extended: false }));

const encrypt = (text) => { return CryptoJS.enc.Base64.stringify (CryptoJS.enc.Utf8.parse (text)); };
const decrypt = (data) => { return CryptoJS.enc.Base64.parse (data).toString (CryptoJS.enc.Utf8); };

app.get("/login", (req, res) => {
    res.send("Ayoooooo!");
});

app.post ("/login", (req, res) => {
    const {username, password} = req.body
    User.findOne ({ username: username}, (err, user) => {
        if (password == null || username == null) res.send ({ message: "Invalid input!" })
        else if (user){
            user.password = decrypt (user.password);
            if (password === user.password) res.send ({message: "Successfully logged in!", user: user})
            else { res.send ({ message: "Wrong credentials!"}) }
        } else {
            res.send({message: "User not found!"});
        }
    })
});

app.post ("/signup", (req,res)=>{
    const { name, username, password} = req.body;
    console.log (req.body);
    User.findOne ({username: username}, (err, user) => {
        if (user){  
            res.send ({message: "Username already exists!"});
        } else {
            const user = new User ({
                name : name,
                username : username,
                password : encrypt (password)
                // password: password
            });

            user.save (err => {
                if (err) res.send (err);
                else res.send ({ message: "Signed-Up successfully!" });
            });
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => console.log (`PORT: ${PORT}`));