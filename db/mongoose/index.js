const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${db_name}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected');
});

const reviewsSchema = new mongoose.Schema({
  id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  posting_date: Date,
  reviewer_name: String,
  helpfulness: Number,
  review_page: Number,
  photos: [{id: Number, url: String}],
  product_id: Number
});

const reviewMetaSchema = new mongoose.Schema({
  id: Number,
  rating: [{rating: Number, total: Number}],
  characteristics: [{
    id: Number,
    name: String,
    value: Number
  }],
  recommended_true: Number,
  recommended_false: Number,
  product_id: Number
});