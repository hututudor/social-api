const HttpStatus = require('http-status-codes');

const create = async (req, res) => {
  try {
    const existingDislike = await req.db.Dislike.findOne({
      user: req.user.id,
      post: req.post.id
    });

    if (existingDislike) {
      return res.message(HttpStatus.CONFLICT, 'Dislike already given');
    }

    const creationData = {
      user: req.user.id,
      post: req.post.id
    };

    const dislike = await new req.db.Dislike(creationData).save();
    await req.db.Post.findByIdAndUpdate(
      { _id: req.post.id },
      { dislikes: req.post.dislikes + 1 }
    );

    return res.success(HttpStatus.CREATED, { dislike });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllPostDislikes = async (req, res) => {
  try {
    const dislikes = await req.db.Dislike.find({
      user: req.user.id,
      post: req.post
    })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { dislikes });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    const existingDislike = await req.db.Dislike.findOne({
      user: req.user.id,
      post: req.post.id
    });

    if (!existingDislike) {
      return res.message(HttpStatus.NOT_FOUND, 'Dislike does not exists');
    }

    await req.db.Dislike.findByIdAndDelete({ _id: existingDislike.id });
    await req.db.Post.findByIdAndUpdate(
      { _id: req.post.id },
      { dislikes: req.post.dislikes - 1 }
    );

    return res.success(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  create,
  retrieveAllPostDislikes,
  remove
};
