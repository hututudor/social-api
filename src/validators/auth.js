const yup = require('yup');

const register = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required(),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required(),
  birthday: yup
    .date()
    .max(new Date())
    .required()
});

const login = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
});

module.exports = {
  register,
  login
};
