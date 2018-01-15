const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  question: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer'}]
}, {
  timestamps: true
});

questionSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Question', questionSchema);
