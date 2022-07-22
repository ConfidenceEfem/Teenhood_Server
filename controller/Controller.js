const mongoose = require('mongoose');

const QuestionModel = require('../models/QuestionModel');
const UserModel = require('../models/UserModel');

const CreateQuestion = async (req, res) => {
  try {
    const { name, question } = req.body;
    const findUser = await UserModel.findOne({
      name: name,
    });

    if (findUser) {
      //   console.log('hello');
      const questionItem = new QuestionModel({
        question: question,
      });
      questionItem.user = findUser;
      questionItem.save();

      findUser.questions.push(questionItem);
      findUser.save();

      res
        .status(201)
        .json({ message: 'Question Asked Success', data: questionItem });
    } else {
      const createUser = await UserModel.create({ name });

      const questionItem = new QuestionModel({
        question: question,
      });

      questionItem.user = createUser._id;
      questionItem.save();

      createUser.questions.push(questionItem);
      createUser.save();

      res
        .status(201)
        .json({ message: 'Question Asked Success', data: questionItem });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find();
    res
      .status(201)
      .json({ message: 'All Users ', data: allUser, total: allUser.length });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAllQuestion = async (req, res) => {
  try {
    const allUser = await QuestionModel.find();
    res.status(201).json({
      message: 'All Questiona ',
      data: allUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  CreateQuestion,
  getAllUser,
  getAllQuestion,
};
