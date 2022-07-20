const express = require('express');
const router = express.Router();

router.get('/login', (req,res)=>{
    res.render('./users/user-login');
})
router.get('/signup', (req,res)=>{
    res.render('./users/user-signup');
})
router.post('/signup', (req,res)=>{
    console.log(req.body);
})

module.exports = router;