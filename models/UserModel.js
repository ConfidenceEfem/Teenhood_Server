const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', UserSchema);
