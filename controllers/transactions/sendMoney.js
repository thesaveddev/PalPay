const User = require('../../model/user');

//show send money form
exports.showSendMoney =
(req, res) => {
    res.status(200).json({
        Title: 'Send Money To Another User',
        currentUser: req.user
    });
};



//send send money to another man
exports.sendMoney = 
(req, res) =>  {
    let sender = req.user
    let {amount, reciever} = req.body;
    //check if user][] inputed an amount
    if(!amount || !reciever){
        return res.status(400).json({
            Title: 'Send Money',
            error: 'Please Enter Amount/Reciever'
        });
    }
    //check if sender has enough funds
    else if (sender.balance < amount) {
        return res.status(406).json({
            Title: 'Send Money',
            Error: `insufficient Funds, You can only send ${sender.balance}`
        });
    }
    else { 
        //check if reciever is a registered user
        User.findOne({email:reciever}, (err, user) => {
            if(!user) {
                res.status(401).json({
                    Error: "Reciepient Not Registered!"
                })
            }
            else {
                reciever = user
            //if true, debit sender
        sender.balance -= Number(req.body.amount);

        //log transaction for sender
        sender.transactions.push({
            'Transaction Type': 'Debit - Send To User',
            'Reciever': reciever,
            'Amount': amount
        });
        //save
        sender.save();

        //notify sender

         //credit receiver
         user.balance += Number(amount);

         //log transaction for reciever
         user.transactions.push({
            'Transaction Type': 'Credit - Recieved From User',
            'Sender': sender.firstName,
            'Amount': amount
        })

        //save
         user.save()
         //notify receiver
     
         //send response to frontend
         return res.status(200).json({
             Title: 'Send Money',
             Status: 'Successful',
             transaction: {
                    'Transaction Type': 'Credit - Recieved From User',
                    'Sender': sender.firstName,
                    'Amount': amount
                    },
                    'Current Balance': sender.balance
                })
            }
        })
    }
}