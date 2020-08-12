'use strict';

const Joi = require('joi');

// Joi schema for validation
module.exports = Joi.object().keys({
  latitude: Joi.number().greater(-90).less(90).required(),
  longitude: Joi.number().greater(-180).less(180).required(),
});
