const User = require('../models/user');
const Wedding = require('../models/wedding');

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
// also need to add deleting any wedding book created by that user

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {

      Wedding
        .find({createdBy: user })

        .then((weddings) => {
          console.log(weddings);
          weddings.forEach((wedding) => {
            return wedding.remove();
          });

        });

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
