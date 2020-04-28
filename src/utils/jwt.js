const jwt = require('jsonwebtoken');

const create = id => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 14 });
};

const decode = token => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = {
  create,
  decode
};
