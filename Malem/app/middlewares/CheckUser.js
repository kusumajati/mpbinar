var User = require('../models/user.model')
var Response = require('./Response')

exports.Create = (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                Response(res, false, "username is taken")
            } else {

                next()
            }

        }).catch(err => {
            Response(res, false, 'err from check user', err)
        })

}

exports.Update = (req, res, next) => {
    if (String(req.username) == String(req.body.username)) {
        next()
    } else {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    Response(res, false, "username is taken")
                } else {

                    next()
                }

            }).catch(err => {
                Response(res, false, 'err from check user', err)
            })

    }
}