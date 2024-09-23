const express = require("express");
const router = express.Router();

router.get('/form',(req, res)=>{
    res.send("users/signup.ejs");
})

module.exports =  router;