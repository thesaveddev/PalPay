//import express
const express = require('express');

//initialize express app
const app = express();

//import middlewares
const auth = require('../controllers/auth');


//define login route
app.post('/signin', auth.signIn);

//define signup route
app.post('/signup', auth.signUp);


module.exports = app