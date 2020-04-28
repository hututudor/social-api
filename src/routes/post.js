const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/',
  middlewares.upload.single('image'),
  middlewares.auth,
  middlewares.validate(validators.post.create),
  controllers.postController.create
);

router.get('/:id', middlewares.post, controllers.postController.retrieveOne);

router.get('/', controllers.postController.retrieveAll);

router.get(
  '/user/:id',
  middlewares.user,
  controllers.postController.retrieveAllUserPosts
);

module.exports = router;
