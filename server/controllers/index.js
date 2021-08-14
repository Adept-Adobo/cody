const models = require('../models');

module.exports = {
  get: (req, res) => {
    console.log('GET review');
    res.status(200).send();
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