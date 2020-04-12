
//import user model
const User = require('../model/user');

//import bcrypt and json web token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signUp = 
async (req, res) => {
     
    //encrypt user password
    let hash = await bcrypt.hash(req.body.password, 10)
         //define a new user variable
         let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            balance: 0,
            password: hash
        }
    
        //create a new user and save to db
        User.create(newUser, (err, user) => {
            if(err) {
                //check for errors
                console.log(err)
                res.status(500).json({
                    Error:'User Already Exists!'
                })
            }
            else { 
                //save created user to database
                   user.save()
                   //get signin token for user
                    let token = jwt.sign(
                        {
                          id:user._id,
                          email: user.email
                        },
                        'dontguessit',
                        {expiresIn: '10m'},
                       )
                       //sign user in and send response to frontend
                       res.status(201).json({
                           Message: 'User Created Successfully!',
                           User: user,
                           Token: token
                       })
                }
            })
        }


        exports.signIn = 
        (req, res) => {
            //get user credentials
            let {email, password} = req.body;

            //check if user exists
            User.findOne({email:email}, (err, user) => {
                if(!user) {
                    console.log('User not found');
                    res.status(404).json({
                        error: 'Invalid Login Credentials'
                    })
                } 
                else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if(!result){
                            console.log('User Provided wrong Password');
                            res.status(404).json({
                                error: 'invalid Login Credentials'
                            })
                        }
                        else {
                            //issue a new token to user
                            let token = jwt.sign(
                                {
                                    id: user._id,
                                    email: user.email
                                },
                                'dontguessit')
                                
                                //sign user in and send a response to the frontend
                                    res.status(200).json({
                                        Title: 'dashboard',
                                        message: 'User Logged In ...',
                                        Token: token
                                    })
                                }
                            })
                        }
                    })
                }