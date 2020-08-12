const assert = require('assert');
const {createInvitee} = require('../models/');

describe('Invitee Class', function() {
  describe('Constructor', function() {
    it('Should return true as invitee is valid', function() {
      assert.ok(createInvitee({
        latitude: '53.2451022',
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: '-6.238335',
      }));
    });

    it('Should throw an error as invitee longitude is invalid', function() {
      const invitee = {
        latitude: '53.2451022',
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: '-196.238335',
      };

      const fn = () => {
        createInvitee(invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as invitee latitude is invalid', function() {
      const invitee = {
        latitude: '653.2451022',
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: '-6.238335',
      };
      const fn = () => {
        createInvitee(invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as invitee id is null', function() {
      const invitee = {
        latitude: '73.2451022',
        user_id: null,
        name: 'Ian Kehoe',
        longitude: '-6.238335',
      };
      const fn = () => {
        createInvitee(invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as invitee id isn\'t present', function() {
      const invitee = {
        latitude: '73.2451022',
        name: 'Ian Kehoe',
        longitude: '-6.238335',
      };
      const fn = () => {
        createInvitee(invitee).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should print friendly version of invitee', function() {
      const invitee = createInvitee({
        latitude: '13.2451022',
        user_id: 4,
        name: 'Ian Kehoe',
        longitude: '-6.238335',
      });
      assert.equal(invitee.toString(), '[ 4 ] \tIan Kehoe');
    });
  });
});
