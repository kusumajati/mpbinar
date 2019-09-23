var product = require('../controller/product.controller')
var Auth = require('../middleware/Auth')


module.exports =(app)=>{
    app.post('/product', product.productCreate )
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
    app.delete('/product/:id', Auth,  product.productDelete)
}