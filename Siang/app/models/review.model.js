const mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    text:{
        type:String, 
        required:true
        }

})

var Review  = mongoose.model('Review', reviewSchema)
module.exports = Review