const yup = require('yup');

const update = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup
    .string()
    .email()
    .notRequired(),
  password: yup
    .string()
    .min(6)
    .notRequired(),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .notRequired(),
  birthday: yup
    .date()
    .max(new Date())
    .notRequired()
});

module.exports = {
  update
};
