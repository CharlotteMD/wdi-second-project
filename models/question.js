const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: { type: String },
  question: { type: mongoose.Schema.ObjectId, ref: 'Question', required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const questionSchema = new mongoose.Schema({
  question: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  answers: [answerSchema]
}, {
  timestamps: true
});

questionSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Question', questionSchema);
