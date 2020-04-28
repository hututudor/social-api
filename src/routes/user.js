const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/me', middlewares.auth, controllers.userController.me);

module.exports = router;
