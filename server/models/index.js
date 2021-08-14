const db = require('../../db/postgreSQL');

module.exports = {
  get: () => {
    return db.query('SELECT * FROM reviews LIMIT 5');
  }
};