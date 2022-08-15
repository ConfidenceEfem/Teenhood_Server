const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    toggle: {
      default: false,
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('question', QuestionSchema);
