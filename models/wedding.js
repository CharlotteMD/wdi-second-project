const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  ref: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  partner1: { type: String, required: true },
  partner2: { type: String, required: true },
  date: { type: Date },
  venue: { type: String, required: true },
  imageMain: { type: String, required: true },
  guests: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question'}]
}, {
  timestamps: true
});

weddingSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Wedding', weddingSchema);
