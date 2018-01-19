const Wedding = require('../models/wedding');


function createQuestionRoute(req, res, next) {
  req.body.createdBy = req.user;

  Wedding
    .findById(req.params.id)
    .then(wedding => {
      if(!wedding) return res.notFound();

      wedding.questions.push(req.body);
      return wedding.save();
    })
    .then((wedding) => res.redirect(`/weddings/${wedding.id}`))
    .catch(next);
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
    .catch(next);
}

module.exports = {
  create: createQuestionRoute,
  delete: deleteQuestionRoute
};
