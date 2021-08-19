import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '1s',
};

let count = 1;

export default function () {
  const product_id = Math.floor(Math.random() * 900000);
  const review_id = Math.floor(Math.random() * 5000000);
  const rating = Math.floor(Math.random() * 5) + 1;
  const rec = Math.random() > 0.5 ? true : false;
  const photo = ["https://i1.wp.com/www.powershellbros.com/wp-content/uploads/2018/04/Test-URL.png?resize=720%2C248&ssl=1"];
  const char = {"quality": rating};
  count += 1;

  const postBody = {
    "product_id": product_id,
    "rating": rating,
    "summary": `load test ${count} summary`,
    "body": `load test ${count} body`,
    "recommend": rec,
    "name": `load tester ${count}`,
    "email": `test${count}@gmail.com`,
    "photos": JSON.stringify(photo),
    "characteristics": JSON.stringify(char)
  };

  const getReviews = http.get(`http://localhost:3000/api/reviews?product_id=${product_id}`);
  check(getReviews, {'status 200': (r) => r.status === 200});

  const getReviewsMeta = http.get(`http://localhost:3000/api/reviews/meta?product_id=${product_id}`);
  check(getReviewsMeta, {'status 200': (r) => r.status === 200});

  const postReview = http.post(`http://localhost:3000/api/reviews`, postBody);
  check(postReview, {'status 201': (r) => r.status === 201});

  const reportReview = http.put(`http://localhost:3000/api/reviews/${review_id}/report`);
  check(reportReview, {'status 204': (r) => r.status === 204});

  const helpfulReview = http.put(`http://localhost:3000/api/reviews/${review_id}/helpful`);
  check(helpfulReview, {'status 204': (r) => r.status === 204});

  sleep(1);
}