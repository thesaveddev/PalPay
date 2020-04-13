//import express
const express = require('express');

//initialize express app
const app = express();

//import middlewares
const auth = require('../controllers/auth/auth');

//show signin page
app.get('/signin', auth.signinForm);

//log users in
app.post('/signin', auth.signIn);

//show signup page
app.get('/signup', auth.signupForm);

//signup user
app.post('/signup', auth.signUp);


module.exports = app