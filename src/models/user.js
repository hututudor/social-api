const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  birthday: {
    type: Date,
    required: true
  },
  profilePicture: {
    type: String,
    required: false
  },
  confirmed: {
    type: Boolean,
    default: null
  },
  confirmation: {
    type: String,
    nullable: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.confirmation;
  return obj;
};

const User = model('User', userSchema);

module.exports = User;
