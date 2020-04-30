const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/posts', require('./post'));
router.use('/likes', require('./like'));
router.use('/dislikes', require('./dislike'));
router.use('/followers', require('./follower'));
router.use('/comments', require('./comment'));
router.use('/notifications', require('./notification'));
router.use('/suggestions', require('./suggestion'));
router.use('/feed', require('./feed'));

module.exports = router;
