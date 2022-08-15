const express = require('express');
const router = express.Router();
const {
  CreateQuestion,
  getAllUser,
  getAllQuestion,
  getOneUser,
  DeleteOneQuestion,
  EditUserQuestion,
  updateToggle
} = require('../controller/Controller');

router.post('/ask', CreateQuestion);
router.get('/alluser', getAllUser);
router.get('/allquestion', getAllQuestion);
router.get('/user/:id', getOneUser);
router.post('/question/:id', DeleteOneQuestion); 
router.post('/question/edit/:id', EditUserQuestion); 
router.post('/question/toggle/:id', updateToggle); 

module.exports = router;
