const HttpStatus = require('http-status-codes');

const utils = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const post = await req.db.Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.message(HttpStatus.NOT_FOUND, 'Post does not exists');
    }

    req.post = post;
    next();
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};
