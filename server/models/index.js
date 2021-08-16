const db = require('../../db/postgreSQL');

module.exports = {
  get: (query) => {
    const {page, count, product_id, sort} = query;
    return db.query(`SELECT id, product_id, rating, posting_date, summary, body, recommend, reported, response, helpfulness, reviewer_id FROM reviews WHERE product_id = ${product_id} ORDER BY id LIMIT ${count} OFFSET ${3 * (page - 1)}`);
  },
  post: () => {console.log('post request')},
  getMeta: (query) => {
    const {product_id} = query;
  },
  putHelpful: (query) => {
    return db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${query}`);
  },
  putReport: () => {console.log('putReport)')},
};