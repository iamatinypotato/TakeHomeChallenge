const assert = require('assert');
const distance = require('../lib/distance_calculator.js')();
const {createInvitee, createZone} = require('../models/');

describe('Distance Calculator', function() {
  describe('In Range', function() {
    it('Should return true as invitee within 100 kms', function() {
      const zone = createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: 53.2451022,
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: -6.238335,
      });
      assert.ok(distance.inRange(zone, invitee));
    });

    it('Should return false as invitee further than 100 kms away', function() {
      const zone = createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: '51.92893',
        user_id: 1,
        name: 'Alice Cahill',
        longitude: '-10.27699',
      });
      assert.notStrictEqual(distance.inRange(zone, invitee), true);
    });
  });

  describe('Calculate Central Angle', function() {
    it('Should return 0 as both points are the same', function() {
      const zone = createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: 53.339428,
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: -6.257664,
      });
      assert.equal(distance.calculateAngle(zone, invitee) < 0.002, true);
    });

    it('Should return roughly central angle of 0.15 ', function() {
      const zone = createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: '53.0652022',
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: '8.766986',
      });
      assert.equal(Math.abs(distance.calculateAngle(zone, invitee) - 0.158) <
        0.002, true);
    });
  });

  describe('Calculate Distance', function() {
    it('Should return 0 as both locations are the same', function() {
      const zone = createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: '53.339428',
        user_id: 1,
        name: 'Alice Cahill',
        longitude: '-6.257664',
      });

      /**
       * This doesn't stricly equal zero because of JS rounding errors.
       * It's possible to remove floating point errors in Nodejs by
       * using outside modules such as BigDecimal, BigNumber etc.
       * There's libraries are important to use when dealing with
       * money for example, but I felt it was fine to do without
       * them for our challenge.
       *  */
      assert.equal(distance.calculateDistance(zone, invitee) < 0.002, true);
    });

    it('Should return 1000 as locations are approx 1,000 kms away', function() {
      const zone= createZone({
        latitude: 53.339428,
        longitude: -6.257664,
        radius: 100,
      });
      const invitee = createInvitee({
        latitude: '53.0652022',
        user_id: 1,
        name: 'Alice Cahill',
        longitude: '8.766986',
      });

      assert.equal(Math.abs(distance.calculateDistance(zone, invitee) - 1000) <
        1, true);
    });

    it('Should thrown an error as numbers are strings', function() {
      const zone = {latitude: 53.339428, longitude: -6.257664};
      const invitee = {
        latitude: '53.0652022',
        longitude: '8.766986',
      };
      const fn = () => {
        distance.calculateDistance(zone, invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should thrown an error as numbers are out of bounds', function() {
      const zone = {latitude: 53.339428, longitude: -6.257664};
      const invitee = {
        latitude: 53.0652022,
        longitude: 228.766986,
      };
      const fn = () => {
        distance.calculateDistance(zone, invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });
  });
});
