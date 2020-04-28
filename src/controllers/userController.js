const HttpStatus = require('http-status-codes');

const me = (req, res) => {
  return res.success(HttpStatus.OK, { user: req.user });
};

module.exports = {
  me
};
