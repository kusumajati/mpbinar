var Review = require('../models/review.model')
var User = require('../models/user.model')
var Product = require('../models/product.model')
var Response = require('../middlewares/Response')

exports.reviewCreate = async (req, res) => {
    try {
        var review = await Review.create({ text: req.body.text, user: req.userId, product: req.query.productId })
        await User.findByIdAndUpdate(review.user, { $push: { reviews: review._id } })
        await Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } })
        Response(res, true, "review created", review)
    } catch (err) {
        Response(res, false, 'error from create handler')
    }
}

exports.reviewShowAll = (req, res) => {
    Review.find({}).then(reviews => {
        res.json({
            success: true,
            message: "reviews retrieved",
            data: reviews
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find review",
            data: err
        })
    })
}

exports.reviewShow = (req, res) => {
    Review.findById(req.params.id).then(review => {
        res.json({
            success: true,
            message: "review retrieved",
            data: review
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot find review",
            data: err
        })
    })
}
exports.reviewUpdate = async(req,res)=>{
    try{
        var review = await Review.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        review? Response(res,true,"review updated", review): Response(res,false,"review not found")
    
    }catch(err){
        Response(res,false,"error handler", err)
    }
}

exports.reviewDelete = async (req,res)=>{
    try{
       var review =  await Review.findByIdAndRemove(req.params.id)
       await User.findByIdAndUpdate(review.user, {$pull:{reviews:review._id}})
       await Product.findByIdAndUpdate(review.product, {$pull:{reviews:review._id}})
       review? Response(res,true,"review deleted", review): Response(res,false,"review not found")
    }catch(err){

    }
}