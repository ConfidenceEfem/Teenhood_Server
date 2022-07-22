const express = require('express');
const router = express.Router();
const {
  CreateQuestion,
  getAllUser,
  getAllQuestion,
} = require('../controller/Controller');

router.post('/ask', CreateQuestion);
router.get('/alluser', getAllUser);
router.get('/allquestion', getAllQuestion);

module.exports = router;
