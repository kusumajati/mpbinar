require('dotenv').config()
var express = require('express')
var app = express()
var PORT = process.env.PORT || 4042
const bodyParser = require('body-parser')
var cors = require('cors')

var mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://nino:${process.env.DB_ATLAS_PASS}@cluster0-e7xbg.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json())

app.use(cors())

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