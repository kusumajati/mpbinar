var jwt = require('jsonwebtoken')
var Response = require('./Response')

module.exports = (req,res) =>{
    if(req.headers.authorization){
        next()
    }else{
        Response(res, false, "token is required")
    }

}