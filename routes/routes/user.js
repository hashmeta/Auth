const Joi = require('joi');
const mongoose = require('mongoose');
const {User,validate}=require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt')


router.get('/',async(req,res)=>{
    const user=await User.find().sort('name')
    res.send(user)
})
router.post('/',async(req,res)=>{
    //validate the body before sending to database by joi
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const duplicateUser=await User.findOne({email:req.body.email})
    if(duplicateUser) return res.status(400).send("Email already registerd")
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
    user=await user.save()
    res.send(user)
})
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id, {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
        ,{new: true});
    if (!user) return res.status(404).send('The genre with the given ID was not found.');
    res.send(user);
})
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('The genre with the given ID was not found.');
    res.send(user);
});
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(user);
});
module.exports = router;