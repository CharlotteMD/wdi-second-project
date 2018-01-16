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
  .delete(secureRoute, weddings.delete);

router.route('/weddings/:id/guests')
  .post(weddings.addGuest);

router.route('/weddings/:id/edit')
  .get(secureRoute, weddings.edit);





// Edit User
// Only accessible by user
router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

// Edit Wedding
// Only accessible by createdby or fiance


// Edit Answers
// Only accessible by createdby or wedding createdby or fiance
router.route('/answers/:id/edit')
  .get(secureRoute, answers.edit);

// New question
// Show on Wedding page
router.route('/questions/new')
  .get(secureRoute, questions.new);

// New answer
// Show on wedding page
router.route('/answers/new')
  .get(secureRoute, answers.new);

router.all('*', (req, res) => res.notFound());

module.exports = router;
