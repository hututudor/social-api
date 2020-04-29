const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/', middlewares.auth, controllers.suggestionController.generate);

module.exports = router;
