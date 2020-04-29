const HttpStatus = require('http-status-codes');

const create = async (req, res) => {
  try {
    if (String(req.user.id) === String(req.userParam.id)) {
      return res.message(HttpStatus.CONFLICT, 'You cannot follow yourself');
    }

    const existingFollowing = await req.db.Follower.findOne({
      user: req.user.id,
      following: req.userParam.id
    });

    if (existingFollowing) {
      return res.message(HttpStatus.CONFLICT, 'Already following this user');
    }

    const creationData = {
      user: req.user.id,
      following: req.userParam.id
    };

    const following = await new req.db.Follower(creationData).save();

    return res.success(HttpStatus.OK, { following });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllFollowers = async (req, res) => {
  try {
    const followers = await req.db.Follower.find({ following: req.user.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { followers });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const retrieveAllFollowings = async (req, res) => {
  try {
    const followings = await req.db.Follower.find({ user: req.user.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { followings });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

const remove = async (req, res) => {
  try {
    const existingFollowing = await req.db.Follower.findOne({
      user: req.user.id,
      following: req.userParam.id
    });

    if (!existingFollowing) {
      return res.message(
        HttpStatus.CONFLICT,
        'You are not following this user'
      );
    }

    await req.db.Follower.findByIdAndDelete({ _id: existingFollowing.id });

    return res.message(HttpStatus.NO_CONTENT, '');
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  create,
  retrieveAllFollowers,
  retrieveAllFollowings,
  remove
};
