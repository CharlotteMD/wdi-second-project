const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: { type: String },
  question: { type: mongoose.Schema.ObjectId, ref: 'Question', required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

answerSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Answer', answerSchema);
