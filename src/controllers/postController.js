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

module.exports = {
  create,
  retrieveOne,
  retrieveAll,
  retrieveAllUserPosts
};
