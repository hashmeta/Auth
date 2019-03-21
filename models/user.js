const mongoose=require('mongoose')
const Joi=require('joi')

const User =mongoose.model('User',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email:{
        type:String,
        //match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024

    }
}))

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required().trim(),
        email: Joi.string().email(),
        password:Joi.string().min(5).max(20).required()
    };
  
    return Joi.validate(user, schema);
  }
  module.exports.User=User
  module.exports.validate=validateUser