'use strict';

const Joi = require('joi');
const locationSchema = require('./location.js');

// Joi schema for validation using location as super
module.exports = locationSchema.keys({
  user_id: Joi.number().integer().required(),
  name: Joi.string().required(),
});
