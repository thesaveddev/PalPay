const User = require('../../model/user');

//show user dashboard
exports.dashboard = 
    (req, res) => {
        User.findOne({_id:req.user.id}).exec()
        .then(
            res.status(200).json({
                Title: 'User Dashboard',
                currentUser: req.user
            })
        )
        .catch(err => {
            res.status(404).json({
                Title: 'User Dashboard',
                Error: `Invalid User Id: ${err}`
            })
        })
    }


//show user profile
exports.profile = 
    (req, res) => {
        User.findOne({_id:req.user.id}).exec()
        .then(
            res.status(200).json({
                Title: 'User Profile',
                currentUser: req.user
            })
        )
        .catch(err => {
            res.status(404).json({
                Title: 'User Profile',
                Error: `Invalid User Id: ${err}`
            })
        })
    }