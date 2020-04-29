const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get(
  '/',
  middlewares.auth,
  controllers.notificationController.retrieveAllNotifications
);

module.exports = router;
