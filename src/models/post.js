const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    default: null,
    nullable: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
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

const Post = model('Post', postSchema);

module.exports = Post;
