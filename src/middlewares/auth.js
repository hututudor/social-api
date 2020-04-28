const HttpStatus = require('http-status-codes');

const utils = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const id = utils.jwt.decode(req.header('x-token')).id;

    const user = await req.db.User.findOne({ _id: id });

    if (!user) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    req.user = user;
    next();
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};
