var product = require('../controller/product.controller')
var Auth = require('../middleware/Auth')
var ProductAuth = require('../middleware/ProductAuth')


module.exports =(app)=>{
    app.post('/product', Auth, product.productCreate )
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
    app.delete('/product/:id', Auth, ProductAuth, product.productDelete)
}