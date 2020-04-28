const yup = require('yup');

const create = yup.object().shape({
  content: yup.string().required()
});

module.exports = {
  create
};
