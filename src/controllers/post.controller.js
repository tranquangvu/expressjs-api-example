const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Post = require('../models/post.model');
const { postSerializer, postCollectionSerializer } = require('../serializers/post.serializer');

exports.listPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(postCollectionSerializer(posts));
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.json(postSerializer(savedPost));
  } catch (error) {
    next(error);
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }
    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};
