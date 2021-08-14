-- DROP DATABASE IF EXISTS cleaner;
-- CREATE DATABASE cleaner;

\c cleaner;

-- DROP TABLE IF EXISTS reviews;

-- CREATE TABLE reviews(
--   id INTEGER PRIMARY KEY,
--   product_id INTEGER NOT NULL,
--   rating SMALLINT NOT NULL,
--   posting_date BIGINT NOT NULL,
--   summary VARCHAR(300) NOT NULL,
--   body VARCHAR(1000) NOT NULL,
--   recommend BOOLEAN,
--   reported BOOLEAN,
--   reviewer_name VARCHAR(50) NOT NULL,
--   reviewer_email VARCHAR(50) NOT NULL,
--   response VARCHAR(1000),
--   helpfulness SMALLINT NOT NULL DEFAULT 0
-- );

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL
);

-- COPY reviews FROM '/Users/codyszeto/Downloads/reviews.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);
COPY users(email, name) FROM '/Users/codyszeto/Documents/sdc/unique_users_cleaned.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);

-- CREATE TABLE emailname(
--   id SERIAL NOT NULL,
--   email VARCHAR(50) NOT NULL,
--   name VARCHAR(50) NOT NULL
-- );

-- DROP TABLE IF EXISTS characteristics;

-- CREATE TABLE characteristics(
--   id SERIAL NOT NULL,
--   name VARCHAR(50),
--   review_id INT NOT NULL,
--   value SMALLINT NOT NULL
-- );

-- CREATE TABLE users(
--   id SERIAL PRIMARY KEY,
--   reviewer_email VARCHAR(),
--   reviewer_name VARCHAR(50) NOT NULL,
-- )


-- COPY charact FROM '/Users/codyszeto/Downloads/characteristics.csv' WITH(FORMAT CSV, DELIMITER ',', HEADER);

--COPY reviews(name, email) FROM '' WITH(FORMAT CSV, DELIMITER ',', HEADER);
