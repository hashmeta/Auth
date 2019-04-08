const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customer=require('./routes/customer')
const movie=require('./routes/movie')
const rental=require('./routes/rental')
const user=require('./routes/user')
const auth=require('./routes/auth')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/Auth-Demo')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customer', customer);
app.use('/api/movie', movie);
app.use('/api/rental',rental)
app.use('/api/user',user)
app.use('/api/auth',auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));