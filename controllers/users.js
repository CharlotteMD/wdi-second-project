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
  console.log('hitting update');
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      console.log('hitting update err');
      if(!user) return res.notFound();

      user = Object.assign(user, req.body);

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/users/${req.id}/edit`, err.toString());
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
    .then(() => res.redirect('/'))
    .catch(next);
}


module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
