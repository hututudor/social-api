const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');

const utils = require('../utils');

const me = (req, res) => {
  return res.success(HttpStatus.OK, { user: req.user });
};

const update = async (req, res) => {
  try {
    let updateFields = {};

    if (req.body.name) {
      updateFields.name = req.body.name;
    }

    if (req.body.gender) {
      updateFields.gender = req.body.gender;
    }

    if (req.body.birthday) {
      updateFields.birthday = req.body.birthday;
    }

    if (req.body.password) {
      updateFields.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      );
    }

    if (req.body.email) {
      const existingUser = await req.db.User.findOne({
        email: req.body.email
      });

      if (existingUser) {
        return res.message(HttpStatus.CONFLICT, 'Email already taken!');
      }
    }

    if (req.file) {
      if (req.user.profilePicture) {
        await utils.s3.remove(req.user.profilePicture);
      }

      updateFields.profilePicture = await utils.s3.upload(req.file);
    }

    console.log(updateFields);

    const user = await req.db.User.findByIdAndUpdate(
      { _id: req.user.id },
      updateFields,
      { new: true }
    );

    return res.success(HttpStatus.OK, { user });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    await req.db.User.findByIdAndDelete({ _id: req.user.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  me,
  update,
  remove
};
