var User =require('../models/user.model')

module.exports = (req,res, next)=>{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            res.json({
                success:false,
                message: "username is taken",
            })
        }else{
            next()
        }

    })
    .catch(err=>{
        
        res.json({
            success:false,
            message: "cannot create user",
            data:err
        })
    })
}
