module.exports=(res, success, message, data, token)=>{
    res.json({
        success: success,
        message: message,
        data: data,
        token: token
    })
}