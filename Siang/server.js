var express = require('express')
var app = express()
var PORT = 3030
const bodyParser = require('body-parser')




const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/binar', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/',(req, res)=>{
    res.send('this is mp-binar-app')


   
})
app.use(bodyParser.json())

//API
require('./app/routes/user.routes')(app)
require('./app/routes/products.routes')(app)

app.listen(PORT, ()=>{
    console.log('Litening on port '+PORT)
})

