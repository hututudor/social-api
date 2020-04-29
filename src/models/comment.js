const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null,
    nullable: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
