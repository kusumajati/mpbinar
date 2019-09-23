var express = require('express')
var app = express()
var PORT = 4042
const bodyParser = require('body-parser')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/binar', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("this works")
})

//API 
require('./app/routes/user.route')(app)
require('./app/routes/review.routes')(app)
require('./app/routes/products.routes')(app)

app.listen(PORT, ()=>{
    console.log('Listening on port '+PORT)
})