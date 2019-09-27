var product = require('../controllers/product.controllers')
var Authentication = require('../middlewares/Authentication')
var Authorization = require('../middlewares/Authorization')

module.exports =(app)=>{
    app.post('/product/', Authentication, product.productCreate )
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
    app.delete('/product/:id', Authentication, Authorization.Product, product.productDelete)
    app.put('/product/:id', Authentication, Authorization.Product, product.productUpdate)
}