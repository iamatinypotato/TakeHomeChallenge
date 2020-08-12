/**
 * Simple class for exporting each Joi Schema in the current directory
 */

const schema = require('../schema/');

const Invitee = require('./invitee.js');
const Location = require('./location.js');
const Zone = require('./zone.js');

const createZone = (options) => {
  const {error, value} = schema.zone.validate(options);
  if (error) {  // If the zone information is invalid, exit the process
    throw new Error(error);
  }
  return new Zone(value);
};

const createInvitee = (options) => {
  const {error, value} = schema.invitee.validate(options);
  if (error) {
    throw new Error(`InvalidArgumentException ${error.details[0].message}`);
  }
  return new Invitee(value);
};


module.exports = {
  Zone,
  Invitee,
  Location,
  createZone,
  createInvitee,
};