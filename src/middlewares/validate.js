const HttpStatus = require('http-status-codes');

module.exports = schema => (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (e) {
    console.log(e);
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: e.errors });
  }
};
