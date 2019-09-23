var user = require('../controllers/user.controller')

module.exports = (app)=>{

    app.post('/user', user.userCreate)
    app.get('/user', user.userShowAll)
    app.get('/user/:id', user.userShow)
    app.put('/user/:id', user.userUpdate)
    app.delete('/user/:id', user.userDelete)
    app.post('/user/login', user.userLogin)
}