var Product = require('../models/product.model')
var User = require('../models/user.model')
var Response = require('../middleware/Response')


exports.productCreate = (req, res) => {
    if(req.headers.userid){
        Product.create({
            name: req.body.name,
            price: req.body.price,
            userId: req.headers.userId
        })
        .then(product=>{
            Response(res, true, "product created", product )
        })
        .catch(err=>{
            Response(res, false, "cannot create product", err)
        })
    }else{
        Response(res, false, "you have to login")
    }
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
    Product.findById(req.params.id).then(product => {
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

exports.productDelete = (req, res) => {

    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (req.userId == product.userId) {
                User.findByIdAndUpdate(req.userId, {$pull:{products:{$in:[product._id]}}})
                .then(()=>{
                    res.json({
                        success: true,
                        message: 'product deleted',
                        data: product
                    })
                }).catch(errUpt=>{
                    res.json({
                        success: false,
                        message: "cannot update user",
                    })
                })
            } else {
                res.json({
                    success: false,
                    message: "cannot delete product",
                })
            }
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot delete product",
                data: err
            })
        })

}