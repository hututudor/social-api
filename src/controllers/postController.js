const HttpStatus = require('http-status-codes');

const utils = require('../utils');

const create = async (req, res) => {
  try {
    const creationData = { ...req.body, user: req.user.id };

    if (req.file) {
      creationData.image = await utils.s3.upload(req.file);
    }

    const post = await new req.db.Post(creationData).save();

    return res.success(HttpStatus.CREATED, { post });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveOne = (req, res) => {
  return res.success(HttpStatus.OK, { post: req.post });
};

const retrieveAll = async (req, res) => {
  try {
    const posts = await req.db.Post.find({})
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { posts });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllUserPosts = async (req, res) => {
  try {
    const posts = await req.db.Post.find({ user: req.userParam })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { posts });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const update = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.post.user)) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    let updateFields = { ...req.body };

    if (req.file) {
      if (req.post.image) {
        await utils.s3.remove(req.post.image);
      }

      updateFields.image = await utils.s3.upload(req.file);
    }

    const post = await req.db.Post.findByIdAndUpdate(
      { _id: req.post.id },
      updateFields,
      { new: true }
    );

    return res.message(HttpStatus.OK, { post });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    if (String(req.user._id) !== String(req.post.user)) {
      return res.message(HttpStatus.UNAUTHORIZED, '');
    }

    await req.db.Post.findByIdAndDelete({ _id: req.post.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  create,
  retrieveOne,
  retrieveAll,
  retrieveAllUserPosts,
  update,
  remove
};
