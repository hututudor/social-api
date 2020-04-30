const HttpStatus = require('http-status-codes');

const generate = async (req, res) => {
  try {
    const users = await req.db.User.find({
      name: new RegExp(req.query.term, 'i')
    })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    const posts = await req.db.Post.find({
      content: new RegExp(req.query.term, 'i')
    })
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort('-createdAt');

    return res.success(HttpStatus.OK, { users, posts });
  } catch (e) {
    req.logger.error(e);
    return res.error();
  }
};

module.exports = {
  generate
};
