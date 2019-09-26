const mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
        text: {
                type: String,
                required: true
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
})

var Review = mongoose.model('Review', reviewSchema)
module.exports = Review