var user = require('../controller/user.controller')
var CheckUser = require('../middleware/CheckUser')

module.exports = (app) =>{
    app.post('/user', CheckUser, user.userCreate)
    app.get('/user', user.userShowAll)
    app.get('/user/:id', user.userShow)
    app.put('/user/:id', CheckUser, user.userUpdate)
    app.delete('/user/:id', user.userDelete)
    app.post('/user/login', user.userLogin)
    
}