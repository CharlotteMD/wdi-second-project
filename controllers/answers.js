const Wedding = require('../models/wedding');

function createAnswerRoute(req, res, next) {
req.body.createdBy = req.user;
  Wedding
    .findById(req.params.id)
    .then(wedding => {
      if(!wedding) return res.notFound();

      const correctQuestion = wedding.questions.id(req.params.questionId);

      req.body.question = correctQuestion;
      correctQuestion.answers.push(req.body);
      const questionIndex = wedding.questions.findIndex((e) => e.id === req.params.questionId);
      wedding.questions.splice(questionIndex, 1, correctQuestion);
      return wedding.save();
    })
    .then(() => res.redirect(`/weddings/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/weddings/${wedding.id}`), err.toString();
      }

      next(err);
    });
}

function editAnswerRoute(req, res, next) {
  Answer
    .findById(req.params.id)
    .exec()
    .then((answer) => {
      if(!answer) return res.notFound();
      return res.render('answers/edit', { answer });
    })
    .catch(next);
}

function updateAnswerRoute(req, res, next) {
  Answer
    .findById(req.params.id)
    .exec()
    .then((answer) => {
      if(!answer) return res.notFound();

      answer = Object.assign(answer, req.body);

      return answer.save();
    })
    .then(() => res.redirect(`/answers/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/answers/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteAnswerRoute(req, res, next) {
  Answer
    .findById(req.params.id)
    .exec()
    .then((answer) => {
      if(!answer) return res.notFound();
      return answer.remove();
    })
    .then(() => res.redirect('weddings/show', { wedding }))
    .catch(next);
}

module.exports = {
  create: createAnswerRoute,
  edit: editAnswerRoute,
  update: updateAnswerRoute,
  delete: deleteAnswerRoute
};
