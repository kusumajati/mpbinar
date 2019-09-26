require('dotenv').config()

var User = require('../models/user.model')
var Response = require('./Response')
var jwt = require('jsonwebtoken')
var secretKey = 'this is a secret'

module.exports = (req, res, next)=>{
    if(req.headers.authorization){
      var decoded =   jwt.verify(req.headers.authorization,  process.env.JWT_SECRET_KEY)
      User.findById(decoded.id)
      .then(user=>{
          if(user){
              req.userId = user._id
              req.username = user.username
              next()
          }else{
              Response(res, false, "You have to log in")
          }
      })
      .catch(err=>{
          Response(res, false, "Something wemt wrong!",err)
      })
    }else{
        Response(res, false, "Token is needed in headers")
    }


}