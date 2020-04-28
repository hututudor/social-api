const yup = require('yup');

const create = yup.object().shape({
  content: yup.string().required()
});

const update = yup.object().shape({
  content: yup.string().notRequired()
});

module.exports = {
  create,
  update
};
