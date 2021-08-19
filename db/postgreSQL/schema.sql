DROP DATABASE IF EXISTS reviewsnew;
CREATE DATABASE reviewsnew;

\c reviewsnew;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL,
  posting_date BIGINT NOT NULL,
  summary VARCHAR(300) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  response VARCHAR(1000), --EC make it more natural
  helpfulness SMALLINT NOT NULL DEFAULT 0,
  reviewer_id INT NOT NULL
);

CREATE TABLE photos(
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url VARCHAR(200) NOT NULL
);

CREATE TABLE characteristics(
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  review_id INT NOT NULL,
  value SMALLINT NOT NULL
);

COPY users(email, name) FROM '/Users/codyszeto/Documents/sdc/unique_users_cleaned.csv'  WITH(FORMAT CSV, DELIMITER ',', HEADER);
COPY reviews FROM '/Users/codyszeto/Documents/sdc/unique_cleaned_reviews.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);
COPY photos FROM '/Users/codyszeto/Downloads/reviews_photos.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);
COPY characteristics(name, review_id, value) FROM '/Users/codyszeto/Documents/sdc/char_cleaned.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);

ALTER TABLE reviews ADD FOREIGN KEY (reviewer_id) REFERENCES users (id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristics ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

-- DROP INDEX IF EXISTS reviews_idx;
CREATE INDEX reviews_idx ON reviews (id);
CREATE INDEX reviews_product_idx ON reviews(product_id);

-- DROP INDEX IF EXISTS char_idx;
CREATE INDEX char_idx ON characteristics (id);
CREATE INDEX char_review_idx ON characteristics(review_id);

-- DROP INDEX IF EXISTS photos_idx;
CREATE INDEX photos_idx ON photos (id);
CREATE INDEX photos_review_idx ON photos(review_id);

-- DROP INDEX IF EXISTS users_idx;
CREATE INDEX users_idx ON users (id);
CREATE INDEX users_name_idx ON users (name);
CREATE INDEX users_email_idx ON users (email);


--SELECT json_object_agg(name, jsonb_build_object('id', id, 'value', value)) FROM characteristics WHERE review_id = 20;
--SELECT COUNT(recommend) FROM reviews WHERE product_id = 25618 AND recommend = true;

--SELECT COUNT(rating) FROM reviews WHERE product_id = 25618 AND rating = 5;
--SELECT COUNT(rating) FROM reviews WHERE product_id = 25618 AND rating = 4;
--SELECT COUNT(rating) FROM reviews WHERE product_id = 25618 AND rating = 3;
--SELECT COUNT(rating) FROM reviews WHERE product_id = 25618 AND rating = 2;
--SELECT COUNT(rating) FROM reviews WHERE product_id = 25618 AND rating = 1;

--SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'id')), (SELECT (MAX("id") + 1) FROM "reviews"), FALSE);