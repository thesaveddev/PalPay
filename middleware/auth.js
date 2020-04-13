//import json web token
let jwt = require('jsonwebtoken');

//import user
let User = require('../model/user');

exports.validateUser =
    (req, res, next) => {

    //check if user is registered
    let user = req.params._id;

    User.findOne({_id:user}).exec()
    .then(user => {
    //if user is valid, check for access token
    if(!req.headers.authorization) {
        return res.status(404).json({
            error: 'Invalid Authentication Token'
        })
    }
    else {
        //get request token
        let token = req.headers.authorization.split(' ')[1];

        //validate request token
        jwt.verify(token, 'dontguessit', (err, result) => {
        if(!result) {
            res.status(400).json({
                Title: 'Access Denied',
                error: 'Not Authorized'
            })
        }
        else {
        //set current user 
        req.user = user;

        //grant user access
        next();
                }
            })
        }
    }).catch(err =>{
        res.status(400).json({
            Title: 'Error',
            Error: 'Bad Request'
        })
    })
}