const router = require('express').Router();

const validators = require('../validators');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.get('/me', middlewares.auth, controllers.userController.me);

router.put(
  '/',
  middlewares.auth,
  middlewares.upload.single('profilePicture'),
  middlewares.validate(validators.user.update),
  controllers.userController.update
);

router.delete('/', middlewares.auth, controllers.userController.remove);

module.exports = router;
