//import express
const express = require('express');

//initialize express app
const app = express();

//import controllers
const addMoney = require('../controllers/transactions/addMoney');
const sendMoney = require('../controllers/transactions/sendMoney');
const requestMoney = require('../controllers/transactions/requestMoney');
const withdrawMoney = require('../controllers/transactions/withdrawMoney');
const history = require('../controllers/transactions/history');
const auth = require('../middleware/auth');

//show add money form
app.get('/user/:_id/transactions/addmoney', auth.validateUser, addMoney.showAddMoney);

//add money to user account
app.post('/user/:_id/transactions/addmoney', auth.validateUser, addMoney.addMoney);

//show send money form
app.get('/user/:_id/transactions/sendmoney', auth.validateUser, sendMoney.showSendMoney);


//send money to other users
app.post('/user/:_id/transactions/sendmoney', auth.validateUser, sendMoney.sendMoney);


//show request money form
app.get('/user/:_id/transactions/requestmoney', auth.validateUser, requestMoney.showRequestMoney);


//request to be paid by other users
app.post('/user/:_id/transactions/requestmoney', auth.validateUser, requestMoney.requestMoney);


//show withdrawal form
app.get('/user/:_id/transactions/withdrawmoney', auth.validateUser, withdrawMoney.showWithdrawMoney);


//withdraw money to user bank account
app.post('/user/:_id/transactions/withdrawmoney', auth.validateUser, withdrawMoney.withdrawMoney);


//show user transaction history
app.get('/user/:_id/transactions/history', auth.validateUser, history);


module.exports = app;