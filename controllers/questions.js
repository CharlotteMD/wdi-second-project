const Question = require('../models/question');
const Wedding = require('../models/wedding');


function createQuestionRoute(req, res, next) {

  // take question from form
  // take user id of person logged in
  // take id of wedding from url
  // push question submitted on form to questions in weddings schema
  const currentUserId = req.user.id;
  const newQuestion   = req.body.question;
  const weddingId     = req.params.id;

  Question
    .find()
    .then(question => {
      Question.questions.push(newQuestion);
      Question.createdby.push(currentUserId);
      return Question.save();
    });

  console.log(req.body);
  req.body.createdBy = req.user;
  Question
    .create(req.body)
    .then(() => res.redirect(`/wedding/${req.params.id}`))
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
    .then(() => res.redirect('/wedding/<%= req.id %>', { Wedding }))
    // how do I find which wedding this is linked to?
    .catch(next);
}

module.exports = {
  create: createQuestionRoute,
  delete: deleteQuestionRoute
};
