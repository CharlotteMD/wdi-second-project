const router = require('express').Router();
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const users = require('../controllers/users');
const weddings = require('../controllers/weddings');
const questions = require('../controllers/questions');
const answers = require('../controllers/answers');
const secureRoute = require('../lib/secureRoute');


// Homepage
router.get('/', (req, res) => res.render('statics/index'));

// Register as a user
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);
// should redirect to login page

// Login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

// Logout
router.route('/logout')
  .get(sessions.delete);

// Show user Page
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

// Wedding Routes
router.route('/weddings')
  .get(weddings.index)
  .post(weddings.create);

router.route('/weddings/new')
  .get(weddings.new);

router.route('/weddings/:id')
  .get(secureRoute, weddings.show)
  .put(secureRoute, weddings.update)
  .delete(secureRoute, weddings.delete)
  .post(questions.create);

router.route('/weddings/:id/guests')
  .post(weddings.addGuest);

router.route('/weddings/:id/edit')
  .get(secureRoute, weddings.edit);

// Questions ROutes
router.route('/weddings/:id/questions')
  // .get(questions.index)
  .post(questions.create);

router.route('/weddings/:id/questions/:questionId')
  // .get(secureRoute, questions.show)
  // .put(secureRoute, questions.update)
  .delete(secureRoute, questions.delete);

// Answers Routes
router.route('/weddings/:id/questions/:questionId/answers')
  .post(answers.create);

// Edit User

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

// Edit Answers
router.route('/answers/:id/edit')
  .get(secureRoute, answers.edit);


router.all('*', (req, res) => res.notFound());

module.exports = router;
