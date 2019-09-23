var Product = require('../models/product.model')
var Response = require('../middlewares/Response')
var User = require('../models/user.model')

exports.productCreate = (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        user: req.userId
    })
    .then(product=>{
        User.findById(product.user)
        .then(userFound=>{
            userFound.products.push(product)
            userFound.save()
            Response(res, true, "product created", product)
        })
        .catch(errUser=>{
            Response(res,false,"something went wrong User", errUser)
        })
    })
    .catch(err=>{
        Response(res,false,"something went wrong", err)
    })
}

exports.productShowAll = (req, res) => {
    Product.find({}).then(products => {
        res.json({
            success: true,
            message: "products retrieved",
            data: products
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find product",
            data: err
        })
    })
}

exports.productShow = (req, res) => {
    Product.findById(req.params.id)
    .populate('user')
    .then(product => {
        res.json({
            success: true,
            message: "product retrieved",
            data: product
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find product",
            data: err
        })
    })
}

