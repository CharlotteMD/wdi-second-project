const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  comment: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

answerSchema.methods.belongsTo = function answerBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const questionSchema = new mongoose.Schema({
  content: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  answers: [ answerSchema ]
}, {
  timestamps: true
});

questionSchema.methods.belongsTo = function questionBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const weddingSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  partner1: { type: String, required: true },
  partner2: { type: String, required: true },
  date: { type: Date },
  venue: { type: String, required: true },
  imageMain: { type: String, required: true },
  guests: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  questions: [ questionSchema ]
}, {
  timestamps: true
});

weddingSchema.methods.belongsTo = function weddingBelongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Wedding', weddingSchema);
