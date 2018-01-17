const Wedding = require('../models/wedding');




// function createQuestionRoute(req, res, next) {
//
//   // take question from form
//   // take user id of person logged in
//   // take id of wedding from url
//   // push question submitted on form to questions in weddings schema
//   req.body.createdBy = req.user;
//
//   Wedding
//     .findById(req.params.id)
//     .then(wedding => {
//       if(!wedding) return res.notFound();
//
//       wedding.questions.push(req.body);
//       return wedding.save();
//     })
//     .then((wedding) => res.redirect(`/weddings/${wedding.id}`))
//     .catch(next);
// }


function createAnswerRoute(req, res, next) {
  // take wedding id
  // add answer to questions object of the correct question that is being answered that the user has selected from the frop down list
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
//
// function createQuestionRoute(req, res, next) {
//
//   // take question from form
//   // take user id of person logged in
//   // take id of wedding from url
//   // push question submitted on form to questions in weddings schema
//   req.body.createdBy = req.user;
//
//   Wedding
//     .findById(req.params.id)
//     .then(wedding => {
//       if(!wedding) return res.notFound();
//
//       wedding.questions.push(req.body);
//       return wedding.save();
//     })
//     .then((wedding) => res.redirect(`/weddings/${wedding.id}`))
//     .catch(next);
// }

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
  create: createAnswerRoute,
  edit: editAnswerRoute,
  update: updateAnswerRoute,
  delete: deleteAnswerRoute
};
