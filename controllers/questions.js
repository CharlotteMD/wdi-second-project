const Question = require('../models/question');
const Wedding = require('../models/wedding');

function newQuestionRoute(req, res) {
  return res.render('questions/new');
}

function createQuestionRoute(req, res, next) {
  console.log(req.body);
  req.body.createdBy = req.user;
  Question
    .create(req.body)
    .then(() => res.redirect('/questions'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/questions/new', err.toString());
      }
      next(err);
    });
}

function deleteQuestionRoute(req, res, next) {
  Question
    .findById(req.params.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();
      return question.remove();
    })
    .then(() => res.redirect('weddings/show', { wedding }))
    // how do I find which wedding this is linked to?
    .catch(next);
}

module.exports = {
  new: newQuestionRoute,
  create: createQuestionRoute,
  delete: deleteQuestionRoute
};
