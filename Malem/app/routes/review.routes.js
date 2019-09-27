var review = require('../controllers/review.controller')
var Authentication = require('../middlewares/Authentication')
var Authorization = require('../middlewares/Authorization')
module.exports =(app)=>{
    app.post('/review', Authentication, review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
    app.put('/review/:id', Authentication, Authorization.Review, review.reviewUpdate)
    app.delete("/review/:id", Authentication, Authorization.Review, review.reviewDelete)
}