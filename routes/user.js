const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Userlogin 
router.get('/login', (req,res)=>{
    res.render('./users/user-login');
})
router.post('/login', (req,res)=>{
    User.findOne({email :req.body.email},(err,docs)=>{
        if (docs){
            console.log(docs);
        bcrypt.compare(req.body.password,docs.password, function(err, done) {
            if (done == true){
                req.session.loggedIn = true;
                req.session.user = docs.username;
                res.redirect('/');
            }
            else{
                res.redirect('/user/login')
            }
        });
    }else{
        console.log("User not found")
        res.redirect('/user/signup')
    }
    })
    //res.render('./users/user-login');
})

//usersignup 
router.get('/signup', (req,res)=>{
    res.render('./users/user-signup');
})
router.post('/signup', async(req,res)=>{
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, saltRounds)
    user.save((err,done)=>{
        if (!err){
            req.session.loggedIn = true;
            req.session.user = req.body.username;
            res.redirect('/')
        }else{
            console.log(err);
        }
    });
})

//usersignout
router.get('/signout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
module.exports = router;