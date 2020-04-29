const HttpStatus = require('http-status-codes');

const utils = require('../utils');

const create = async (req, res) => {
  try {
    const creationData = { ...req.body, user: req.user.id, post: req.post.id };

    if (req.file) {
      creationData.image = await utils.s3.upload(req.file);
    }

    const comment = await new req.db.Comment(creationData).save();

    return res.success(HttpStatus.CREATED, { comment });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveOne = (req, res) => {
  return res.success(HttpStatus.OK, { comment: req.comment });
};

const retrieveAllUserComments = async (req, res) => {
  try {
    const comments = await req.db.Comment.find({ user: req.userParam.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { comments });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllPostComments = async (req, res) => {
  try {
    const comments = await req.db.Comment.find({ post: req.post.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { comments });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const update = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.comment.user)) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    let updateFields = { ...req.body, updatedAt: new Date() };

    if (req.file) {
      if (req.comment.image) {
        await utils.s3.remove(req.comment.image);
      }

      updateFields.image = await utils.s3.upload(req.file);
    }

    const comment = await req.db.Comment.findByIdAndUpdate(
      { _id: req.comment.id },
      updateFields,
      { new: true }
    );

    return res.success(HttpStatus.OK, { comment });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.comment.user)) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    await req.db.Comment.findByIdAndDelete({ _id: req.comment.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  create,
  retrieveOne,
  retrieveAllPostComments,
  retrieveAllUserComments,
  update,
  remove
};
