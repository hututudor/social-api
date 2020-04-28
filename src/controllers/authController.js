const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');

const utils = require('../utils');

const register = async (req, res) => {
  try {
    const existingUser = await req.db.User.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.message(HttpStatus.CONFLICT, 'User already exists!');
    }

    const password = await bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    const user = await req.db.User.create({
      ...req.body,
      password
    });

    const token = utils.jwt.create(user.id);

    return res.success(HttpStatus.CREATED, { user, token });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const login = async (req, res) => {
  try {
    const user = await req.db.User.findOne({
      email: req.body.email
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.message(HttpStatus.NOT_FOUND, 'Incorrect email or password');
    }

    const token = utils.jwt.create(user.id);

    return res.success(HttpStatus.OK, { user, token });
  } catch (e) {
    req.logger.error(e);
    return res.error;
  }
};

module.exports = {
  register,
  login
};
