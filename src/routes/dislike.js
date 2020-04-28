const router = require('express').Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/:id',
  middlewares.auth,
  middlewares.post,
  controllers.dislikeController.create
);

router.get(
  '/post/:id',
  middlewares.auth,
  middlewares.post,
  controllers.dislikeController.retrieveAllPostDislikes
);

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.post,
  controllers.dislikeController.remove
);

module.exports = router;
