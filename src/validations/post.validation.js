const { Joi } = require('express-validation');

module.exports = {
  createPostValidation: {
    body: Joi.object({
      title: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      body: Joi.string()
        .required(),
    }),
  },
};
