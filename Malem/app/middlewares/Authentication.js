var User = require('../models/user.model')
var Response = require('./Response')
module.exports = (req, res, next)=>{
    User.findById(req.headers.userid)
    .then(user=>{
        if(user){
            req.userId = user._id
            next()
        }else{
            Response(res, false, "You have to log in")
        }
    })
    .catch(err=>{
        Response(res, false, "Something wemt wrong!",err)
    })
}