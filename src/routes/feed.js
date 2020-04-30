const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/', middlewares.auth, controllers.feedController.generate);

module.exports = router;
