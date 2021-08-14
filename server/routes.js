// const controller = require('./controllers');
const router = require('express').Router();

router.route('/')
  .get((req, res, next) => {
    console.log('get request at localhost:3000/api/');
    res.status(200).send();
  });

router.route('/products')
  .get((req, res, next) => {
    console.log('get request at localhost:3000/api/products');
    res.status(200).send();
  })

module.exports = router;