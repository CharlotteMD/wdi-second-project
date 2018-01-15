const router = require('express').Router();
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const users = require('../controllers/users');
const weddings = require('../controllers/weddings');
const questions = require('../controllers/questions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/index'));

// User Pages

router.route('/users')
// homepage
  .get(users.index)
  .post(secureRoute, users.create);

  // also want login page success to redirect here

router.route('/users/register')
// user register page
  .get(secureRoute, users.new);
  .get(registrations.new)
  .post(registrations.create);
  // should redirect to login page

router.route('/users/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.id.show)
  // only need the one user to show so do I need user.id?
  .delete(secureRoute, users.id.delete);
  // also want to be able to update wedding info with linked user id from this page
  .get(weddings.show)
  // only want some weddings info on this page

  .delete(secureRoute, weddings.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);
  .put(secureRoute, users.id.update)
  // redirects back to user/:id
  // only want to update the one user so do I need user.id?

router.route('/users/:id/weddings/:id/edit')
  .get(secureRoute, weddings.edit);
  .put(secureRoute, weddings.update)
  .get(secureRoute, questions.edit);
  .put(secureRoute, questions.update)
  // redirects back to user/:id

// Weddings Pages

router.route('/users/:id/weddings/:id/')
  .post(questions.createAnswer);
  .get(questions.show);
  .get(answers.show);
  .

router.route('/users/:id/weddings/:id/')
  .delete(answers.deleteAnswer);

router.all('*', (req, res) => res.notFound());

module.exports = router;
