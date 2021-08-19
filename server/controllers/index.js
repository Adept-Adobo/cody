const models = require('../models');

module.exports = {
  get: async (req, res) => {
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
  post: async (req, res) => {
    try {
      const data = await models.post(req.body);
      typeof data === 'string' ? res.status(400).send(data) : res.status(201).send('Review posted');
    } catch(e) {
      res.status(500).send('ERROR POSTING REVIEW');
    }
  },
  getMeta: async (req, res) => {
    const { product_id } = req.query;
    try {
      const data = await models.getMeta(product_id);
      res.status(200).send(data);
    } catch(e) {
      res.status(500).send('ERROR GETTING META DATA', e);
    }
  },
  putHelpful: async (req, res) => {
    const { review_id } = req.params;
    try {
      await models.putHelpful(review_id);
      res.status(204).send('Helpfulness update successful');
    } catch(e) {
      res.status(500).send('ERROR UPDATING HELPFUL', e);
    }
  },
  putReport: async (req, res) => {
    const { review_id } = req.params;
    try {
      await models.putReport(review_id);
      res.status(204).send('Report update successful');
    } catch(e) {
      res.status(500).send('ERROR UPDATING REPORT', e);
    }
  },
};