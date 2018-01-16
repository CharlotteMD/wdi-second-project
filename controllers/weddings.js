const Wedding = require('../models/wedding');
const User = require('../models/user');

function newWeddingRoute(req, res) {
  console.log('in new wedding route');
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
    .populate('createdBy')
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
  Wedding
    .findById(req.params.id)
    .exec()
    .then((wedding) => {
      if(!wedding) return res.notFound();
      return wedding.remove();
    })
    .then(() => res.redirect(`/users/${User.id}`))
    .catch(next);
}


module.exports = {
  new: newWeddingRoute,
  create: createWeddingRoute,
  show: showWeddingRoute,
  edit: editWeddingRoute,
  update: updateWeddingRoute,
  delete: deleteWeddingRoute
};
