const HttpStatus = require('http-status-codes');

const generate = async (req, res) => {
  try {
    const followings = await req.db.Follower.find({ user: req.user.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt')
      .select('following');

    if (followings.length === 0) {
      return res.message(HttpStatus.NOT_FOUND, 'No feed available');
    }

    let feed = await Promise.all(
      followings.map(following =>
        req.db.Post.find({ user: following.following })
      )
    );

    feed = [].concat.apply([], feed);

    return res.success(HttpStatus.OK, { feed });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  generate
};
