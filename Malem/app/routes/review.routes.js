var review = require('../controllers/review.controller')
var Authentication = require('../middlewares/Authentication')

module.exports =(app)=>{
    app.post('/review', Authentication, review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
}