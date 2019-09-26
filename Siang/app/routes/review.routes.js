var review = require('../controller/review.controller')
var Authentication = require('../middleware/Authentication')

module.exports =(app)=>{
    app.post('/review', Authentication, review.reviewCreate)

}