const User = require('../../model/user');

//show request money form
exports.showRequestMoney =
(req, res) => {
    res.status(200).json({
        Title: 'Request For Money From Another User',
        currentUser: req.user
    })
}


//request money from another user
exports.requestMoney = (req, res) => {
    let {amount, reciever} = req.body;

    //check if user filled all required fields
    if(!amount || !reciever) {
        return res.status(400).json({
            Error: "Please Fill All Required Fields!"
        })
    }
    //find reciever
    User.findOne({email:reciever}, (err, user) => {
        if(!user) {
            res.status(400).json({
                Error: "Reciepient Not Registered!"
            })
        } 
        else {
            //compose mail


            //send request to reciever

            
            //send response to front end
            res.status(200).json({
                Title: 'Request For Money From Another User',
                status: 'Successful'
            })
        }
    })


}