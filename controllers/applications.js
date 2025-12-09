const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req,res)=>{
    try{
        res.render('applications/index.ejs')  
    }catch(err){
        console.log(err)
        res.redirect('/')
    }   
})



module.exports = router