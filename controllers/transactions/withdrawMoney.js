const User = require('../../model/user');

//show Withdraw money form
exports.showWithdrawMoney =
(req, res) => {
    res.status(200).json({
        Title: 'Withdraw Money To Bank Account',
        currentUser: req.user
    });
};


//withdraw money to user bank account
exports.withdrawMoney =
(req, res) => {

    //get the body of the request
    let {amount, bankName, accountNumber, accountName} = req.body;
    let user = req.user;

    //check if request body is valid
    if(!amount || !bankName || !accountNumber || !accountName) {
        return res.status(401).json({
            Error: 'Please Fill All Required Fields'
        })
    }

    //check is user has enough funds to withdraw
    if(user.balance < amount) {
        return res.status(401).json({
            Error: `Insufficient Funds! You can only withdraw ${user.balance}.`
        })
    }
    else {
        //debit the user
        user.balance -= amount;

        //log transaction for user
        user.transactions.push({
            'Transaction TYpe': 'Debit - Withdraw To Bank',
            'Status': 'Successful',

        })
        user.save();

        //transfer money to user bank account using desired payment processor api

        //send a response to the front end
        res.status(200).json({
            TItle: 'Withdraw Money To Bank Account',
            Status: 'Successful',
            'Current Balance': user.balance
        })
    }

}