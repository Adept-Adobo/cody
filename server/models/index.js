const db = require('../../db/postgreSQL');

module.exports = {
  get: (query) => {
    const {page, count, product_id, sort} = query;
    return db.query(`
    SELECT id AS review_id, rating, summary, recommend,
    CASE response WHEN 'null' THEN null ELSE response END,
    body, posting_date AS date,
    (SELECT name FROM users WHERE id = reviews.reviewer_id LIMIT 1) AS reviewer_name,
     helpfulness, (SELECT CASE COUNT(photos) WHEN 0 THEN '[]' ELSE jsonb_agg(photos) END
     FROM (SELECT photos.id, photos.url FROM photos WHERE photos.review_id = reviews.id) AS photos) AS photos
     FROM reviews WHERE product_id = ${product_id}
     ORDER BY id LIMIT ${count}
     OFFSET ${3 * (page - 1)}`);
  },
  post: async (query) => {
    const {product_id, rating, summary, body, recommend, reported = false, response = null, helpfulness = 0, name, email, photos = [], characteristics} = query;
    try {
      // get/create user id
      let id = await db.query(`SELECT id FROM users WHERE email = '${email}' AND name = '${name}'`);
      if (id.rows.length === 0) {
        id = await db.query(`INSERT INTO users(email, name) VALUES('${email}', '${name}') RETURNING id;`);
      }
      try {
        // post review and get review_id
        const reviewColumns = `product_id, rating, posting_date, summary, body, recommend, reported, response, helpfulness, reviewer_id`;
        const reviewValues = `${product_id}, ${rating}, ${Date.now()}, '${summary}', '${body}', ${recommend}, ${reported}, ${response ? `${response}` : null}, ${helpfulness}, ${id.rows[0]['id']}`;
        let review_id = await db.query(`INSERT INTO reviews(${reviewColumns}) VALUES(${reviewValues}) RETURNING id;`);
        // insert photos to db if exists
        if (photos.length > 0) {
          let query = [];
          for (let photo of photos) {
            query.push(`(${review_id.rows[0]['id']}, '${photo}')`);
          }
          try {
            let formattedQuery = query.join(',');
            await db.query(`INSERT INTO photos(review_id, url) VALUES ${formattedQuery};`);
          } catch(e) {console.log('Error posting image URLs');}
        }
        // insert characteristics to db if exists
        if (Object.keys(characteristics).length > 0) {
          let query = [];
          for (let char in characteristics) {
            query.push(`('${char}', ${review_id.rows[0]['id']}, ${characteristics[char]})`);
          }
          try {
            let formattedQuery = query.join(',');
            await db.query(`INSERT INTO characteristics(name, review_id, value) VALUES ${formattedQuery};`);
          } catch(e) {console.log('ERROR POSTING CHARACTERISTICS');}
        }
      } catch(e) {
        console.log('POST body improper format');
      }
    } catch(e) {
      console.log('failed post');
    }
  },
  getMeta: async (product_id) => {
    try {
      const charData = await db.query(`SELECT characteristics.id, characteristics.name, characteristics.value
      FROM characteristics INNER JOIN reviews
      ON characteristics.review_id = reviews.id
      AND reviews.product_id = ${product_id};`);
      let characteristics = {};
      for (let obj of charData.rows) {
        const { id, name, value } = obj;
        characteristics[name] ? characteristics[name].push({id, value}) : characteristics[name] = [{id, value}];
      }
      try {
        const ratingData = await db.query(`SELECT rating FROM reviews WHERE product_id = ${product_id}`);
        let ratings = {};
        for (let obj of ratingData.rows) {
          let rating = Object.values(obj);
          ratings[`${rating}`] = ratings[`${rating}`] + 1 || 1;
        }
        try {
          const recData = await db.query(`SELECT recommend FROM reviews WHERE product_id = ${product_id}`);
          let recommended = {"true": 0, "false": 0};
          for (let obj of recData.rows) {
            const { recommend } = obj;
            recommend ? recommended.true += 1 : recommended.false += 1;
          }
          return {product_id, ratings, recommended, characteristics};
        } catch(e) {
          console.log('Failure getting recommend data');
        }
      } catch(e) {
        console.log('failure getting rating data');
      }
    } catch(e) {
      console.log('Failure getting meta data');
    }
  },
  putHelpful: (review_id) => {
    return db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
  },
  putReport: (review_id) => {
    return db.query(`UPDATE reviews SET reported = NOT reported WHERE id = ${review_id}`);
  },
};