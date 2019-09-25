var Product = require('../models/product.model')
var Response = require('./Response')
var User = require('../models/user.model')

exports.product = (req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>{
        if(String(req.userId) == String(product.user)){
            next()
        }else{
            Response(res, false, "your not authorized")
        }
        
    })
    .catch(err=>{
        Response(res,false,"something went wrong from ProductAuth", err)
    })
}

exports.user = (req,res,next)=>{
    if(req.userId == req.params.id){
       next()
    }else{
        Response(res, false, "your not authorized")
    }
}