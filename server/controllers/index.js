const models = require('../models');

module.exports = {
  get: async (req, res) => {
    console.log('GET review');
    // { page=1, count=5, product_id, sort } = req.query;
    const {page = 1, count = 5, product_id, sort = 'newest'} = req.query;
    if (product_id) {
      try {
        const data = await models.get({page, count, product_id, sort});
        res.status(200).send(data.rows);
      } catch(e) {
        res.status(500).send('GET review ERROR: ', e);
      }
    } else {
      res.status(400).send('Missing product_id parameter.');
    }
  },
  post: (req, res) => {
    console.log('POST review');
    res.status(201).send();
  },
  getMeta: (req, res) => {
    console.log('GET review meta');
    res.status(200).send();
  },
  putHelpful: async (req, res) => {
    console.log('PUT helpful');
    const { review_id } = req.params;
    try {
      models.putHelpful(review_id);
      res.status(204).send('Helpfulness update successful');
    } catch(e) {
      res.status(500).send('ERROR UPDATING HELPFUL', e);
    }
  },
  putReport: (req, res) => {
    console.log('PUT report');
    const { review_id } = req.params;
    try {
      models.putReport(review_id);
      res.status(204).send('Report update successful');
    } catch(e) {
      res.status(500).send('ERROR UPDATING REPORT', e);
    }
  },
};