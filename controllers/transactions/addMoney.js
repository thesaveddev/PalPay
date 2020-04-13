const User = require('../../model/user');

//show add money form
exports.showAddMoney =
    (req, res) => {

        res.status(200).json({
            Title: 'Add Money To User Account',
            currentUser: req.user
        })
    }

//add money to user account
exports.addMoney =
    (req, res) => {
        //check if user inputed an amount
        if(!req.body.amount){
            return res.status(400).json({
                Title: 'Add Money',
                error: 'Please Enter Amount'
            })
        }
        else {
        //credit sender
        req.user.balance += Number(req.body.amount);
        req.user.save().then(

        //log transaction for user
        req.user.transactions.push({
            transactionType: 'Credit - Self Deposit',
            transactionStatus: 'Successful',
            transactionAmount: req.body.amount
        }).then (

            //send a response to front end
                 res.status(200).json({
                     Title: 'Add Money',
                     message: 'Deposit Successful',
                     Transaction: {
                        transactionType: 'Credit - Self Deposit',
                        transactionStatus: 'Successful',
                        transactionAmount: req.body.amount
                    },
                    'Current Balance': req.user.balance
                 })
        )


        //notify user via email
        )
        .catch(err => {
            res.status(404).json({
                Title: 'Add Money',
                Error: `Unsuccessful: ${err}`
            })
        })
    }
}