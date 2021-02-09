const express = require('express');
const app = express();
const path = require('path');


require("./db/connect");
const registerUser = require("./models/user");

app.use(express.static(path.join(__dirname, '../public')));

const registerPath = path.join(__dirname,'../public/register.html');
const loginPath = path.join(__dirname,'../public/form.html');
const welcomePath = path.join(__dirname,'../public/welcome.html')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("/",(req,res)=>{
    res.sendFile(registerPath);
});

app.get("/register",(req,res)=>{
    res.sendFile(registerPath);
});

app.post("/register",async (req,res)=>{
    try{
        const userData = new registerUser({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        })
        const registered = await userData.save();
        res.status(201).sendFile(loginPath);
    }
    catch(err){
        res.status(400).send('Invalid credentials');
    }
});



app.get("/form",(req,res)=>{
    res.sendFile(loginPath);
});

app.post("/form",async(req,res)=>{
    try{
        const userName = req.body.userName;
        const password = req.body.password;
        const dataName = await registerUser.findOne({userName});
        if (dataName.password === password){
            res.status(200).sendFile(welcomePath);
        }else{
            res.send('Invalid credentials');
        }
    } catch (error){
        res.status(400).send(error);
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Use localhost:${PORT} to access.`);
});