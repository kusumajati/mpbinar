var review = require('../controllers/review.controller')


module.exports =(app)=>{
    app.post('/review', review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
}