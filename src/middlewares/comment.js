const HttpStatus = require('http-status-codes');

const utils = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const comment = await req.db.Comment.findOne({ _id: req.params.id });

    if (!comment) {
      return res.message(HttpStatus.NOT_FOUND, 'Comment does not exists');
    }

    req.comment = comment;
    next();
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};
