const reviews = require('./controllers');
const router = require('express').Router();

router.route('/')
  .get((req, res, next) => {
    console.log('get request at /api/');
    res.status(200).send();
  });

router.route('/reviews')
  .get(reviews.get)
  .post(reviews.post);

router.route('/reviews/meta')
  .get(reviews.getMeta);

router.route('/reviews/:review_id/helpful')
  .put(reviews.putHelpful);

router.route('/reviews/:review_id/report')
  .put(reviews.putReport);

module.exports = router;