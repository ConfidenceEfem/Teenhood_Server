const mongoose = require('mongoose');
require('dotenv').config();
const QuestionModel = require('../models/QuestionModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// const checkAuth = async (req, res, next) => {
//   try {
//     const authToken = req.headers.authorization;
//     const token = authToken.split(' ')[1];
//     const verify = jwt.verify(
//       token,
//       process.env.JSON_SECRET,
//       (error, payload) => {
//         if (error) {
//           res.status(400).json({ message: 'Invalid TOKEN' });
//         } else {
//           req.user = payload;
//           next();
//         }
//       }
//     );
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

const CreateQuestion = async (req, res) => {
  try {
    const { name, question } = req.body;
    const findUser = await UserModel.findOne({
      name: name,
    });

    if (findUser) {
      if (req.headers.authorization) {
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
        res.status(404).json({ message: 'Please use another name' });
      }
    } else {
      const createUser = await UserModel.create({ name });

      const token = jwt.sign(
        {
          name: name,
        },
        process.env.JSON_SECRET,
        { expiresIn: '1d' }
      );

      const questionItem = new QuestionModel({
        question: question,
      });

      questionItem.user = createUser._id;
      questionItem.save();

      createUser.questions.push(questionItem);
      createUser.save();

      res.status(201).json({
        message: 'User Registered Successfully',
        data: { data: createUser, token },
      });
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

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const findOneUser = await UserModel.findById(id);
    res.status(201).json({ message: 'One user', data: findOneUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const DeleteOneQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const oneDeleted = await QuestionModel.findByIdAndDelete(id);
    res.status(201).json({ message: 'One Question Deleted', data: oneDeleted });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  CreateQuestion,
  getAllUser,
  getAllQuestion,
  getOneUser,
  DeleteOneQuestion,
};
