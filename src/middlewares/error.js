const httpStatus = require('http-status');
const { entries, assign } = require('lodash');
const { ValidationError: ExpressValidationError } = require('express-validation');
const { Error: { ValidationError: MongooseValidationError } } = require('mongoose');
const { env } = require('../config/vars');
const APIError = require('../utils/APIError');

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof ExpressValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.details,
      status: err.statusCode,
    });
  } else if (err instanceof MongooseValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: entries(err.errors)
        .reduce((result, [key, validatorError]) => {
          const validatorErrorJSON = validatorError.toJSON();

          return assign({}, result, {
            [key]: validatorErrorJSON.message,
          });
        }, {}),
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
