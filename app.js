//import requirements
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//create database connection
mongoose.connect('mongodb://localhost/palpay', {useUnifiedTopology:true, useNewUrlParser:true}, console.log('DB Connected'));

//define routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const transactionsRoute = require('./routes/transactions');
const usersRoute = require('./routes/users');


//use routes
app.use(indexRoute);
app.use(authRoute);
app.use(transactionsRoute);
app.use(usersRoute);
app.listen(3000, () => console.log('Server Started On Port 3000'))
module.exports = app;
