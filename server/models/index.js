const db = require('../../db/postgreSQL');

module.exports = {
  get: (query) => {
    const {page, count, product_id, sort} = query;
    return db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY id LIMIT ${count} OFFSET ${3 * (page - 1)}`);
  }
};