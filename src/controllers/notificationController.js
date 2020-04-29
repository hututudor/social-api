const HttpStatus = require('http-status-codes');

const retrieveAllNotifications = async (req, res) => {
  try {
    const notifications = await req.db.Notification.find({ user: req.user.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { notifications });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.notification.user)) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    await req.db.Notification.findByIdAndDelete({ _id: req.notification.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const removeAll = async (req, res) => {
  try {
    await req.db.Notification.remove({ user: req.user.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  retrieveAllNotifications,
  remove,
  removeAll
};
