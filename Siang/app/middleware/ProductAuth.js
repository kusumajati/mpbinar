var Product = require('../models/product.model')
var Response = require('../middleware/Response')
module.exports = (req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>{
                    console.log(req.params.id)

        // next()
        // console.log(String(req.userId), String(product.user))
        if(String(req.userId) == String(product.user)){
        // res.send('harusnya ini')
            next()
        }else{
            Response(res, false, "your not authorized")
        }
        
    })
    .catch(err=>{
        Response(res,false,"something went wrong from ProductAuth", err)
    })
}