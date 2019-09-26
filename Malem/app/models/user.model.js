var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required:[true, "Username is required!"],
        minlength: [4, "username minimum length is 4 characters"],
        maxlength: [10, "username maximum length is 10 characters"]
    },
    password: {
        type:String, 
        required:[true, "Password is required!"],
        minlength: [8, "password minimum length is 8 characters"],
        // maxlength: [12, "password maximum length is 12 characters"]

    },
    products:[{type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'Review'}]
  });

  var User = mongoose.model('User', userSchema);

  module.exports = User