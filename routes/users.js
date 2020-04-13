//import express
const express = require('express');

//initialize express app
const app = express();

//import controller
const user = require('../controllers/users/user');

//import middleware
const auth = require('../middleware/auth')

//show user dashboard
app.get('/user/:_id/dashboard', auth.validateUser, user.dashboard);

//show user profile
app.get('/user/:_id/profile', auth.validateUser, user.profile);


module.exports = app;