const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/:id',
  middlewares.auth,
  middlewares.post,
  controllers.likeController.create
);

router.get(
  '/post/:id',
  middlewares.auth,
  middlewares.post,
  controllers.likeController.retrieveAllPostLikes
);

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.post,
  controllers.likeController.remove
);

module.exports = router;
