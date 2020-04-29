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

module.exports = {
  retrieveAllNotifications
};
