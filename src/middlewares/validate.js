const HttpStatus = require('http-status-codes');

module.exports = schema => (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (e) {
    req.logger.error(e);
    return res.message(HttpStatus.BAD_REQUEST, e.errors);
  }
};
