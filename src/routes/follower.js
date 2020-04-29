const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/:id',
  middlewares.auth,
  middlewares.user,
  controllers.followerController.create
);

router.get(
  '/',
  middlewares.auth,
  controllers.followerController.retrieveAllFollowers
);

router.get(
  '/following',
  middlewares.auth,
  controllers.followerController.retrieveAllFollowings
);

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.user,
  controllers.followerController.remove
);

module.exports = router;
