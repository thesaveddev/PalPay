const User = require('../../model/user');


//show user transaction history
module.exports = 
    (req, res) => {
        User.findOne({_id:req.user.id}).exec()
        .then(user =>
            res.status(200).json({
                Title: 'User Dashboard',
                currentUser: req.user,
                userTransactions: user.transactions
            })
        )
        .catch(err => {
            res.status(404).json({
                Title: 'Transaction History',
                Error: `Invalid User Id: ${err}`
            })
        })
    }