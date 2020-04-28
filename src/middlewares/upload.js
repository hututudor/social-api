const multer = require('multer');

module.exports = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1000 * 1000 }
});
