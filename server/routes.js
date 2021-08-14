const controller = require('./controllers');
const router = require('express-promise-router')();

router.route('/')
  .get((req, res, next) => {
    console.log('get request at /api/');
    res.status(200).send();
  });

router.route('/reviews')
  .get(controller.get)
  .post(controller.post);

router.route('/reviews/meta')
  .get(controller.getMeta);

router.route('/reviews/:review_id/helpful')
  .put(controller.putHelpful);

router.route('/reviews/:review_id/report')
  .put(controller.putReport);

module.exports = router;