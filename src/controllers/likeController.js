const HttpStatus = require('http-status-codes');

const create = async (req, res) => {
  try {
    const existingLike = await req.db.Like.findOne({
      user: req.user.id,
      post: req.post.id
    });

    if (existingLike) {
      return res.message(HttpStatus.CONFLICT, 'Like already given');
    }

    const creationData = {
      user: req.user.id,
      post: req.post.id
    };

    const like = await new req.db.Like(creationData).save();
    await req.db.Post.findByIdAndUpdate(
      { _id: req.post.id },
      { likes: req.post.likes + 1 }
    );

    return res.success(HttpStatus.CREATED, { like });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllPostLikes = async (req, res) => {
  try {
    const likes = await req.db.Like.find({ user: req.user.id, post: req.post })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { likes });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    const existingLike = await req.db.Like.findOne({
      user: req.user.id,
      post: req.post.id
    });

    if (!existingLike) {
      return res.message(HttpStatus.NOT_FOUND, 'Like does not exists');
    }

    await req.db.Like.findByIdAndDelete({ _id: existingLike.id });
    await req.db.Post.findByIdAndUpdate(
      { _id: req.post.id },
      { likes: req.post.likes - 1 }
    );

    return res.success(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  create,
  retrieveAllPostLikes,
  remove
};
