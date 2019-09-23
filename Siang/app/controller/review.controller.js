var Review = require('../models/review.model')
var User = require('../models/user.model')

exports.reviewCreate = (req,res)=>{
    Review.create({
        text: req.body.text
    }).then(review=>{
        User.findById(req.body.userId)
        .then(user=>{
            user.reviews.push(review._id)
            user.reviews[0] == null?user.reviews.splice(0,1):null
            user.save()
            res.json({
                success:true,
                message:"review created",
                data:review
            
            })
        })
        .catch(errUser=>{
            res.json({
                success:false,
                message:"'userId' is required in body",
                data:errUser
            })
        })

    }).catch(err=>{
        res.json({
            success:false,
            message:"cannot create review",
            data:err
        })
    })
}

exports.reviewShowAll =(req,res)=>{
    Review.find({}).then(reviews=>{
        res.json({
            success:true,
            message:"reviews retrieved",
            data:reviews
        })
    }).catch(err=>{
        res.json({
            success:false,
            message:"cannot find review",
            data:err
        })
    })
}

exports.reviewShow = (req,res)=>{
    Review.findById(req.params.id).then(review=>{
        res.json({
            success:true,
            message:"review retrieved",
            data:review
        })
    }).catch(err=>{
        res.json({
            success:false,
            message:"cannot find review",
            data:err
        })
    })
}