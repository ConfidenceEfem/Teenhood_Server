const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT;
const router = require('./router/Router');
const app = express();
app.use(express.json());

app.use(cors());

const url = process.env.MONGOOSE_URL;

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
