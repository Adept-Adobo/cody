CREATE DATABASE reviews;

\c reviews;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    rating SMALLINT NOT NULL,
    summary VARCHAR(300) NOT NULL,
    recommend BOOLEAN NOT NULL,
    response VARCHAR(1000), --EC make it more natural
    body VARCHAR(1000) NOT NULL,
    posting_date BIGINT NOT NULL,
    helpfulness SMALLINT NOT NULL DEFAULT 0,
    product_id INTEGER NOT NULL,
    reviewer_email VARCHAR(50) NOT NULL,
    FOREIGN KEY (reviewer_email) REFERENCES users(email)
);

CREATE TABLE photos(
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL,
    url VARCHAR(200) NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    value SMALLINT NOT NULL,
    review_id SMALLINT NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);