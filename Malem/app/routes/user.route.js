var user = require('../controllers/user.controller')
var Authentication  = require('../middlewares/Authentication')
var Authorization = require('../middlewares/Authorization')
var CheckUser = require('../middlewares/CheckUser')

module.exports = (app)=>{

    app.post('/user', CheckUser.Create,  user.userCreate)
    app.get('/user', user.userShowAll)
    app.get('/user/:id', user.userShow)
    app.put('/user/:id', Authentication, Authorization.User, CheckUser.Update, user.userUpdate)
    app.delete('/user/:id', Authentication, Authorization.User, user.userDelete)
    app.post('/user/login', user.userLogin)
}