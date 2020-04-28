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

module.exports = {
  create
};
