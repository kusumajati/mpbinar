const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true, 
        minlength:[4, "product name is 4 characters minimum"],
        maxlength:[20, "product name is 20 characters maximum"]
    },
    price:{
        type:Number, 
        required:true, 
        min:[1000, "product price minimum is Rp 1,000,-"]
    },
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
})


var Product  = mongoose.model('Product', productSchema)
module.exports = Product