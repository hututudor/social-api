const dotenv = require('dotenv');
const server = require('./src/server');

const ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;

dotenv.config({
  path: `./config/.env.${ENV}`
});

server().then(app => {
  app.listen(PORT, () =>
    console.log(`Server listening to http://localhost:${PORT}`)
  );
});
