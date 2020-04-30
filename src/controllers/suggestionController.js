const HttpStatus = require('http-status-codes');

const generate = async (req, res) => {
  try {
    const followings = await req.db.Follower.find({ user: req.user.id })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .select('following');

    if (followings.length === 0) {
      return res.message(HttpStatus.NOT_FOUND, 'No suggestions available');
    }

    const suggestions = await Promise.all(
      followings.map(following =>
        req.db.User.findOne({ _id: following.following })
      )
    );

    return res.success(HttpStatus.OK, { suggestions });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  generate
};
