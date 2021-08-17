const db = require('../../db/postgreSQL');

module.exports = {
  get: (query) => {
    const {page, count, product_id, sort} = query;
    return db.query(`SELECT id AS review_id, rating, summary, recommend, CASE response WHEN 'null' THEN null ELSE response END, body, posting_date AS date, (SELECT name FROM users WHERE id = reviews.reviewer_id LIMIT 1) AS reviewer_name, helpfulness, (SELECT CASE COUNT(photos) WHEN 0 THEN '[]' ELSE jsonb_agg(photos) END FROM (SELECT photos.id, photos.url FROM photos WHERE photos.review_id = reviews.id) AS photos) AS photos FROM reviews WHERE product_id = ${product_id} ORDER BY id LIMIT ${count} OFFSET ${3 * (page - 1)}`);
  },
  post: () => {console.log('post request')},
  getMeta: (query) => {
    const {product_id} = query;
  },
  putHelpful: (review_id) => {
    return db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
  },
  putReport: (review_id) => {
    return db.query(`UPDATE reviews SET reported = NOT reported WHERE id = ${review_id}`);
  },
};