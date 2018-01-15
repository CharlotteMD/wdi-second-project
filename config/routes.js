const router = require('express').Router();
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const users = require('../controllers/users');
const weddings = require('../controllers/weddings');
const questions = require('../controllers/questions');
const secureRoute = require('../lib/secureRoute');


// User Pages

// Homepage
router.get('/', (req, res) => res.render('statics/index'));

// router.route('/users')
// //  homepage - why do I need duplicate?
//   .get(users.index)
//   .post(secureRoute, users.create);
//   // dont want all users displayed!
//   // also want login page success to redirect here

router.route('/users/register')
// user register page
  .get(secureRoute, users.new);
  .get(registrations.new);
  .post(registrations.create);
  // should redirect to login page

router.route('/users/login')
// user login page
  .get(sessions.new);
  .post(sessions.create);

router.route('/logout')
// user logout page
  .get(sessions.delete);

router.route('/users/:id')
// user profile page
  .get(users.id.show);
  // only need the one user to show so do I need user.id?
  .delete(secureRoute, users.id.delete);
  // also want to be able to update wedding info with linked user id from this page
  .get(weddings.id.show);
  // only want some weddings linked to this id
  .delete(secureRoute, weddings.id.delete);


router.route('/users/:id/edit')
  .get(secureRoute, users.edit);
  .put(secureRoute, users.id.update);
  // redirects back to user/:id
  // only want to update the one user so do I need user.id?

router.route('/weddings/:id/edit')
  .get(secureRoute, weddings.edit);
  .put(secureRoute, weddings.update);
  .get(secureRoute, questions.edit);
  .put(secureRoute, questions.update);
  // redirects back to user/:id

// Questions Pages

router.route('/weddings/:id/')
// Questions are linked to a specific wedding
  .post(questions.createAnswer);
  .get(questions.show);
  .get(answers.show);

router.route('/users/:id/weddings/:id/questions/new')
  .get(secureRoute, questions.new);
  .post(questions.create);

router.route('/users/:id/weddings/:id/questions/new')

router.route('/users/:id/weddings/:id/')
  .delete(answers.deleteAnswer);

router.all('*', (req, res) => res.notFound());

module.exports = router;
