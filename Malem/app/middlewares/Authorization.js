var Product = require('../models/product.model')
var Response = require('./Response')
var Review = require('../models/review.model')

exports.Product = (req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>{

        if(String(product.user) == String(req.userId)){
           next()
        }else{
            console.log(typeof product.user, typeof req.userId)
            Response(res, false, "your not authorized")
        }
    })
    .catch(err=>{
        Response(res,false,"error from Authorization",err)
    })
}

exports.User = (req,res, next)=>{
    if(String(req.params.id) == String(req.userId)){
        next()
    }else{
        Response(res, false,"you are not authorized")
    }
}

exports.Review = async (req,res,next)=>{
    try{
        var review = await Review.findById(req.params.id)

        if(String(review.user) == String(req.userId)){
            next()
        }else{
            Response(res,false,"youre not authorized")
        }
    }catch(err){
        Response(res, false, "error from authorization", err)
    }
}