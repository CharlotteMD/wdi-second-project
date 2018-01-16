const Answer = require('../models/answer');
// const Wedding = require('../models/wedding');

function newAnswerRoute(req, res) {
  return res.render('answers/new');
}

function createAnswerRoute(req, res, next) {
  console.log(req.body);
  req.body.createdBy = req.user;
  Answer
    .create(req.body)
    .then(() => res.redirect('/answers'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/answers/new', err.toString());
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
    // how do I find which wedding this is linked to?
    .catch(next);
}

module.exports = {
  new: newAnswerRoute,
  create: createAnswerRoute,
  edit: editAnswerRoute,
  update: updateAnswerRoute,
  delete: deleteAnswerRoute
};
