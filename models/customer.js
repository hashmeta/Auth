const mongoose = require('mongoose');
const Joi=require('joi')
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim:true
    },
    phone: {
        type: String,
        validate:{
            validator:function(v){
                return v && v.length>9
            },
            message:'Phone number is atleast 10 digit'
        }
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold:Joi.boolean().required(),
        phone:Joi.string().min(10).required()
    };
  
    return Joi.validate(customer, schema);
  }
  module.exports.Customer=Customer
  module.exports.validate=validateCustomer