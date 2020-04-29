const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/:id',
  middlewares.upload.single('image'),
  middlewares.auth,
  middlewares.post,
  middlewares.validate(validators.comment.create),
  controllers.commentController.create
);

router.get(
  '/:id',
  middlewares.comment,
  controllers.commentController.retrieveOne
);

router.get(
  '/user/:id',
  middlewares.user,
  controllers.commentController.retrieveAllUserComments
);

router.get(
  '/post/:id',
  middlewares.post,
  controllers.commentController.retrieveAllPostComments
);

router.put(
  '/:id',
  middlewares.auth,
  middlewares.comment,
  middlewares.upload.single('image'),
  middlewares.validate(validators.comment.update),
  controllers.commentController.update
);

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.comment,
  controllers.commentController.remove
);

module.exports = router;
