const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
firstName: {type:String, unique:false, required:true},
lastName: {type:String, unique:false, required:true},
email: {type:String, unique:true, required:true},
phone: {type:String, unique:true, required:true},
password: {type:String, unique:true, required:true},
balance: {type:Number, unique:false, required:false},
transactions: {type:Array, unique:false, required:false}
})

module.exports = mongoose.model('User', userSchema);