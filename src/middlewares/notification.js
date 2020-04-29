const HttpStatus = require('http-status-codes');

const utils = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const notification = await req.db.Notification.findOne({
      _id: req.params.id
    });

    if (!notification) {
      return res.message(HttpStatus.NOT_FOUND, 'Notification does not exists');
    }

    req.notification = notification;
    next();
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};
