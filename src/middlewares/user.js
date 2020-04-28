const HttpStatus = require('http-status-codes');

const utils = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const user = await req.db.User.findOne({ _id: req.params.id });

    if (!user) {
      return res.message(HttpStatus.NOT_FOUND, 'User does not exists');
    }

    req.userParam = user;
    next();
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};
