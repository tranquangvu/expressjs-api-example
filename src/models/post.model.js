const mongoose = require('mongoose');

/**
 * Schema
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
postSchema.method({});

/**
 * Statics
 */
postSchema.statics = {};

module.exports = mongoose.model('Post', postSchema);
