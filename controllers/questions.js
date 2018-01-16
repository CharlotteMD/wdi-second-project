const Question = require('../models/question');
const Wedding = require('../models/wedding');

function newQuestionRoute(req, res) {
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

  // Wedding
  //   .find()
  //   .then(wedding => {
  //     Wedding.questions.push(newQuestion);
  //     Question.createdby.push(currentUserId);
  //     return Wedding.save();
  //   });

  return res.render('/wedding/<%= req.id %>');
}

function createQuestionRoute(req, res, next) {
  console.log(req.body);
  req.body.createdBy = req.user;
  Question
    .create(req.body)
    .then(() => res.redirect('/wedding/<%= req.id %>'))
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
  new: newQuestionRoute,
  create: createQuestionRoute,
  delete: deleteQuestionRoute
};
