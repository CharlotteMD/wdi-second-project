const User = require('../models/user');

function showRoute(req, res, next) {
  console.log('hitting');
  User
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((user) => {
      console.log('hitting');
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.body.password.length === 0) {
    delete req.body.password;
    delete req.body.passwordConfirmation;
  }
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      console.log('hitting update err');

      user = Object.assign(user, req.body);

      return user.save();
    })
    .then((user) => res.redirect(`/users/${user._id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/index'))
    .catch(next);
}


module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
