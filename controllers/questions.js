const Wedding = require('../models/wedding');


function createQuestionRoute(req, res, next) {

  // take question from form
  // take user id of person logged in
  // take id of wedding from url
  // push question submitted on form to questions in weddings schema
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
    // how do I find which wedding this is linked to?
    .catch(next);
}

module.exports = {
  create: createQuestionRoute,
  delete: deleteQuestionRoute
};
