const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT;
const router = require('./router/Router');
const app = express();
app.use(express.json());

const url = process.env.MONGOOSE_URL1;

mongoose.connect(url).then(() => {
  console.log('Connected to DB');
});

app.get('/', (req, res) => {
  res.send('Teens QA running fine');
});

app.use('/', router);

app.listen(port, () => {
  console.log('Listening to port', port);
});
