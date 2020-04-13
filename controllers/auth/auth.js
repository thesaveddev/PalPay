
//import user model
const User = require('../../model/user');

//import bcrypt and json web token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//import email sender
const mailer = require('../../middleware/mailer');


//show sign up page
exports.signupForm = 
(req, res) => {
    res.status(200).json({
        Title: 'Sign Up Page'
    })
}

//sign new user up
exports.signUp = 
    (req, res) => {
        //check if all required fields are submitted
     if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.password){
        return res.status(400).json({
            Error:'Please Fill All Required Fields'
        });
     }
     else {
         //check if user already exist
         User.findOne({email:req.body.email}, async (err, user) => {
             if(user){
                 return res.status(401).json({
                     Error:'User Already Exists!'
                 })
             }
             else {
                 //encrypt user password
         let hash = await bcrypt.hash(req.body.password, 10);
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
                res.status(401).json({
                    Message:'User Already Exists!',
                    error: err
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
                        {expiresIn: '5m'},
                       )
                       //sign user in and send response to frontend
                       res.status(201).json({
                           Message: 'User Created Successfully!',
                           User: user,
                           Token: token
                       })
                     }
                     //compose mail options
                     let mailOptions = {
                         from: 'itsopeyemi@gmail.com',
                         to: user.email,
                         subject: 'Welcome To PalPay',
                         html: `Dear ${user.firstname}, Thank you for signing up on PalPay, We hope you will find our services worthwhile.`
                       };
                       
                     //send welcome email to user
                     mailer.sendMail(mailOptions);
                 })
             }
         })
     }
}


//show sign in page
exports.signinForm = 
(req, res) => {
    res.status(200).json({
        Title: 'Sign In Page'
    })
}


    //sign in users
    exports.signIn = 
        (req, res) => {
            //get user credentials
            let {email, password} = req.body;

            //check if all required fields are submitted
     if(!email || !password){
        return res.status(400).json({
            Error:'Please Fill All Required Fields'
        });
     }
            //check if user exists
            User.findOne({email:email}, (err, user) => {
                if(!user) {
                    console.log('User not found');
                    res.status(404).json({
                        error: 'Invalid Login Credentials'
                    })
                } 
                else {
                    //check user password
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
                                'dontguessit',
                                {expiresIn: '5m'}
                                )
                                
                                //sign user in and send a response to the frontend
                                    res.status(200).json({
                                        Title: 'dashboard',
                                        message: 'User Logged In ...',
                                        Token: token
                                    })
                                }

                                //notify user of successful login via email


                            })
                        }
                    })
                }