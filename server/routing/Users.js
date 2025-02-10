const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");
const exp = require("constants");

router.post("/register", (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(422).json({error: "Please fill all the fields"});
    }
    const newUser = new User({name:name, email:email, password:crypto.createHash('sha256').update(password).digest('base64')});
    newUser.save().then(()=>{
        return res.status(200).json({message: "User registered successfully"});
    })
    .catch((err)=>{ return res.status(422).json({error: "Email or User already exists"})});


});


router.post("/login", (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please fill all the fields"});
    }
    User.findOne({email: email}).then((user)=>{
        if(crypto.createHash('sha256').update(password).digest('base64')!==user.password){
            return res.status(422).json({error: "Invalid Email or Password"});
        }
        delete user.password
        // res.status(200).json(user)
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{ expiresIn: "1h"});
        const {_id, name, email} = user;
        res.cookie("token", token,{httpOnly: true});
        res.json({ user: { name:name, email:email}});
        // return res.redirect('/welcome')
    })
});

module.exports = router;