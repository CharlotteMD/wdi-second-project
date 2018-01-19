const Wedding = require('../models/wedding');
const User = require('../models/user');

function indexWeddingRoute (req, res) {
  Wedding
    .find()
    .exec()
    .then((weddings) => {
      res.render('weddings/index', { weddings });
    })

    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function newWeddingRoute(req, res) {
  return res.render('weddings/new');
}

function createWeddingRoute(req, res, next) {
  req.body.ref = Math.floor(1000 + Math.random() * 9000);
  req.body.createdBy = req.user;

  Wedding
    .create(req.body)
    .then(wedding => res.redirect(`weddings/${wedding.id}`))
    .catch(err => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/weddings/new', err.toString());
      }
      next(err);
    });
}

function showWeddingRoute(req, res, next) {
  Wedding
    .findById(req.params.id)
    .populate('createdBy questions.createdBy questions.answers.createdBy')
    .exec()
    .then((wedding) => {
      if(!wedding) return res.notFound();
      return res.render('weddings/show', { wedding });
    })
    .catch(next);
}

function editWeddingRoute(req, res, next) {
  Wedding
    .findById(req.params.id)
    .exec()
    .then((wedding) => {
      if(!wedding) return res.notFound();
      return res.render('weddings/edit', { wedding });
    })
    .catch(next);
}

function updateWeddingRoute(req, res, next) {
  Wedding
    .findById(req.params.id)
    .exec()
    .then((wedding) => {
      if(!wedding) return res.notFound();

      wedding = Object.assign(wedding, req.body);

      return wedding.save();
    })
    .then(() => res.redirect(`/weddings/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/weddings/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteWeddingRoute(req, res, next) {
  const user = req.user;

  Wedding
    .findById(req.params.id)
    .exec()
    .then((wedding) => {
      if(!wedding) return res.notFound();
      return wedding.remove();
    })
    .then(() => res.render('users/show'), { user })
    .catch(next);
}

function addGuestToWedding(req, res, next) {
  const currentUserId = req.user.id;
  const userRef       = req.body.ref;

  Wedding
    .findById(req.params.id)
    .then(wedding => {
      if (wedding.ref === userRef) {
        wedding.guests.push(currentUserId);
        return wedding.save();
      } else {
        console.log('incorrect code');
      }
    })
    .then(wedding => {
      console.log(wedding);
      res.redirect(`/weddings/${wedding.id}`);
    });
}


module.exports = {
  index: indexWeddingRoute,
  new: newWeddingRoute,
  create: createWeddingRoute,
  show: showWeddingRoute,
  edit: editWeddingRoute,
  update: updateWeddingRoute,
  delete: deleteWeddingRoute,
  addGuest: addGuestToWedding
};
