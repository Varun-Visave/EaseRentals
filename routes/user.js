const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.get('/form',(req, res)=>{
    res.send("form");
=======
router.get((req, res)=>{
    res.send("users/signup.ejs");
>>>>>>> 43ddf12a42aab40f60f4ed3fb12e78cadb8ca653
})

module.exports =  router;