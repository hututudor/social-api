const { Notification } = require('../models');

module.exports = async (user, message) => {
  try {
    await new Notification({ user, message }).save();
  } catch (e) {
    throw e;
  }
};
