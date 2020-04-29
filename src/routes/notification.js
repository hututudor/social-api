const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get(
  '/',
  middlewares.auth,
  controllers.notificationController.retrieveAllNotifications
);

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.notification,
  controllers.notificationController.remove
);

router.delete(
  '/',
  middlewares.auth,
  controllers.notificationController.removeAll
);

module.exports = router;
