var product = require('../controllers/product.controllers')
var Authentication = require('../middlewares/Authentication')

module.exports =(app)=>{
    app.post('/product/', Authentication, product.productCreate )
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
}