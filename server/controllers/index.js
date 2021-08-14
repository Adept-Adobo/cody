const models = require('../models');

module.exports = {
  get: async (req, res) => {
    console.log('GET review');
    try {
      const data = await models.get();
      res.status(200).send(data);
    } catch(e) {
      res.status(500).send('GET review ERROR: ', e);
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
  putHelpful: (req, res) => {
    console.log('PUT helpful');
    res.status(204).send();
  },
  putReport: (req, res) => {
    console.log('PUT report');
    res.status(204).send();
  },
};