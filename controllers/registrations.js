const User = require('../models/user');

function newRoute(req, res) {
  return res.render('users/new');
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('statics/index', err.toString());
      }
      next(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
