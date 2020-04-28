const HttpStatus = require('http-status-codes');

const register = async (req, res) => {
  try {
    const existingUser = await req.db.User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.message(HttpStatus.CONFLICT, 'User already exists!');
    }

    const user = await req.db.User.create(req.body);

    return res.success(HttpStatus.CREATED, { user });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  register
};
