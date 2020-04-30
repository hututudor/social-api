const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

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

    const confirmation = uuid.v4().replace(/-/g, '');

    const user = await req.db.User.create({
      ...req.body,
      password,
      confirmation
    });

    await utils.mail.sendConfirmationMail(user.email, confirmation);

    return res.success(HttpStatus.CREATED, { user });
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

    if (!user.confirmed) {
      return res.message(HttpStatus.NOT_FOUND, 'Account not confirmed');
    }

    const token = utils.jwt.create(user.id);

    return res.success(HttpStatus.OK, { user, token });
  } catch (e) {
    req.logger.error(e);
    return res.error;
  }
};

const confirm = async (req, res) => {
  try {
    const user = await req.db.User.findOne({
      confirmation: req.params.confirmation
    });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).send('User not found');
    }

    await req.db.User.findByIdAndUpdate(
      { _id: user.id },
      { confirmed: true, confirmation: '' }
    );

    return res
      .status(HttpStatus.OK)
      .send('Your account has been verified. You can now login.');
  } catch (e) {
    req.logger.error(e);
    return res.error;
  }
};

module.exports = {
  register,
  login,
  confirm
};
