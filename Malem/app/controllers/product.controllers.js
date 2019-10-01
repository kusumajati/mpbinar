var Product = require('../models/product.model')
var Response = require('../middlewares/Response')
var User = require('../models/user.model')

exports.productCreate = (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        user: req.userId,
        images:req.body.images
    })
        .then(product => {
            User.findById(product.user)
                .then(userFound => {
                    userFound.products.push(product)
                    userFound.save()
                    Response(res, true, "product created", product)
                })
                .catch(errUser => {
                    Response(res, false, "something went wrong User", errUser)
                })
        })
        .catch(err => {
            Response(res, false, "something went wrong", err)
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

exports.productDelete = (req, res) => {
    Product.findByIdAndDelete(req.params.id, { useFindAndModify: false })
        .then(product => {
            User.findById(product.user)
                .then((userFound) => {

                    var findIndexProduct = userFound.products.findIndex(found => String(found) == String(product._id))
                    userFound.products.splice(findIndexProduct, 1)
                    userFound.save()
                    Response(res, true, "Product Deleted", product)

                })
                .catch(errUser => {
                    Response(res, false, "error from handler user", errUser)

                })
        })
        .catch(err => {
            Response(res, false, "error from handler", err)
        })
}

exports.productUpdate = async (req,res)=>{
    try{
      var product =  await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
       product? Response(res,true,"product updated", product): Response(res,false,"product not found")

    }catch(err){
        Response(res,false, "err from product handler", err)
    }
}