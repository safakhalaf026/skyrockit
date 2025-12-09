const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        const {applications} = currentUser
        res.render('applications/index.ejs', {applications})  
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async(req,res)=>{
    try{
        res.render('applications/new.ejs') 
    }catch(err){
        console.error(err)
        res.redirect('/')
    }
})

router.post('/', async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id) // AWAIT  لا تنسين 
        currentUser.applications.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/applications`)
    }catch(err){
        console.error(err)
        res.redirect('/')
    }
})

router.get('/:applicationId', async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        const application = currentUser.applications.id(req.params.applicationId)
        res.render('applications/show.ejs', {application})
    }catch(err){
        console.error(err)
        res.redirect('/')
    }
})

router.delete('/:applicationId', async(req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id)
        currentUser.applications.id(req.params.applicationId).deleteOne()
        await currentUser.save()
        res.redirect('/users/${currentUser._id}/applications')   
    }catch(err){
        console.error(err)
        res.redirect('/')
    }
})

router.get('/:applicationId/edit',async (req,res)=>{
    const currentUser = await User.findById(req.session.user._id)
    const application = currentUser.applications.id(req.params.applicationId)
    res.render('applications/edit.ejs', {application: application,})
})
module.exports = router