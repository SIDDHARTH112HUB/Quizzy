var express = require('express');
var path = require('path');
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.sendFile('../HTML/signup.html',{root : __dirname});
    console.log('signup_page _opened');
});
router.post('/register',(req,res)=>{
    res.send(req.body);
    console.log('just send');
});

module.exports = router;