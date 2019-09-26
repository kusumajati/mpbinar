var Review = require('../models/review.model')
var User = require('../models/user.model')
var Response = require('../middleware/Response')
var Product = require('../models/product.model')

exports.reviewCreate = async (req, res) => {
    //    Review.create({
    //        text:req.body.text,
    //        user:req.userId,
    //        product: req.query.productId
    //    }).then(review=>{
    //        User.findByIdAndUpdate(review.user, {$push:{reviews:review._id}},{useFindAndModify:false})
    //        .then(()=>{
    //         Product.findByIdAndUpdate(review.product, {$push:{reviews:review._id}},{useFindAndModify:false})
    //         .then(()=>{
    //             Response(res, true, "review created", review)
    //         }).catch(errProduct=>{
    //             Response(res,false,'error from product handler', errProduct)
    //         })
    //        }).catch(errUser=>{
    //            Response(res,false,"err from user handler", errUser)
    //        })
    //    }).catch(err=>{
    //        Response(res,false, "error from create handler", err)
    //    })

    try {
        var review = await Review.create({
            text: req.body.text,
            user: req.userId,
            product: req.query.productId
        })
        await User.findByIdAndUpdate(review.user, { $push: { reviews: review._id } }, { useFindAndModify: false })
        await Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } }, { useFindAndModify: false })
        
        Response(res, true, "review created", review)

    } catch (err) {
        Response(res, false, "error from create handler", err)

    }

}