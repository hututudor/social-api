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

module.exports = router;
