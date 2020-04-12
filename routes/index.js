//import express
const express = require('express');

//initialize express app
const app = express();

//import controllers
const index = require('../controllers/index')

//define routes
app.get('/', index);


module.exports = app;