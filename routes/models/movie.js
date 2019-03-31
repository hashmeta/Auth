const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema}=require('./genres')

const Movie = mongoose.model('Movie', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
    },
    dailyRentalRate:{
        type:Number,
        requried:true,
        min:0,
        max:255
    }
  }));
function validateMovie(movie){
    const schema={
        title:Joi.string().min(5).max(50).required(),
        genreID:Joi.string().required(),
        numberInStock:Joi.number().min(8).required(),
        dailyRentalRate:Joi.number().min(8).required()
    }
    return Joi.validate(movie,schema)
}
module.exports.Movie=Movie
module.exports.validate=validateMovie
