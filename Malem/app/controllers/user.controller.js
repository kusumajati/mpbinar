var User = require('../models/user.model')
var Response = require('../middlewares/Response')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var secretKey = 'this is a secret'

exports.userCreate = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                Response(res, false, "username is taken")
            } else {
                var newUser = new User({
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
                newUser.save()
                    .then(savedUser => {
                        res.json({
                            success: true,
                            message: "user is created",
                            data: savedUser
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: "cannot create user",
                            data: err
                        })
                    })
            }
        })
        .catch(error => {
            Response(res, false, "cannot create user", error)
        })

}

exports.userShowAll = (req, res) => {
    User.find({})
        .then(allUser => {
            res.json({
                success: true,
                message: " all user is cretrieved",
                data: allUser
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot get all user",
                data: err
            })
        })
}

exports.userShow = (req, res) => {
    User.findById(req.params.id)
    .populate({
        path: "products",
        select: ["name", "price"]
    })
        .then(user => {
            if (user) {
                res.json({
                    success: true,
                    message: " user is retrieved",
                    data: user
                })
            } else {
                res.json({
                    success: false,
                    message: "cannot get user",
                    data: err
                })
            }
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot get user",
                data: err
            })
        })
}

exports.userUpdate = (req, res) => {
    User.findByIdAndUpdate(req.params.id,
        { $set: req.body }, { new: true, strict: false })
        .then(user => {
            res.json({
                success: true,
                message: " user is updated",
                data: user
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot update user",
                data: err
            })
        })
}
exports.userDelete = (req, res) => {

    var id = req.params.id
    User.findByIdAndDelete(id, { useFindAndModify: false })
        .then((deletedUser) => {
            res.json({
                success: true,
                message: " user is deleted",
                data: deletedUser
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot delete user",
                data: err
            })
        })
}

exports.userLogin = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
           var hash = bcrypt.compareSync(req.body.password, user.password);
           if(hash){
            var token = jwt.sign({username:user.username, id:user._id}, secretKey)
            Response(res, true, "your loggedin", token)
           } else{
            Response(res, false, "wrong password")

           }
        })
        .catch(err => {
            Response(res, false, "oops something happened", err)
        })
}