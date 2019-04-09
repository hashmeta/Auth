const Joi = require('joi');
const mongoose = require('mongoose');
const {User}=require('../models/user')
const express = require('express');
const bcrypt=require('bcrypt')
const _=require('loadsh')
const router = express.Router();
const jwt=require('jsonwebtoken')


router.get('/',async(req,res)=>{
    const user=await User.find().sort('name')
    res.send(user)
})
router.post('/',async(req,res)=>{
    //validate the body before sending to database by joi
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("User Doesnt found")

    const validpassword=await bcrypt.compare(req.body.password,user.password)
    const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'))
    !validpassword ? res.send('Incorrent password'):res.send(`Welcome ${user.name},${token}`)


})

function validate(user) {
    const schema = {
        email: Joi.string().email(),
        password:Joi.string().min(5).max(20).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;