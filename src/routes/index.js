const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./post'));
router.use('/likes', require('./like'));
router.use('/dislikes', require('./dislike'));

module.exports = router;
