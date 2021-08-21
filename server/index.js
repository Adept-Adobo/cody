const express = require('express');
const router = require('./routes.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('You have accessed the API');
  res.send('welcome to my API');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});