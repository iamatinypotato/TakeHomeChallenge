const assert = require('assert');
const {createZone} = require('../models/');

describe('Zone Class', function() {
  describe('Constructor', function() {
    it('Should return true as zone is valid', function() {
      assert.ok(createZone({
        latitude: '53.2451022',
        radius: 100,
        longitude: '-6.238335',
      }));
    });

    it('Should throw an error as longitude is invalid', function() {
      const zone = {
        latitude: '53.2451022',
        radius: 100,
        longitude: '-196.238335',
      };

      const fn = () => {
        createZone(zone).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as latitude is invalid', function() {
      const zone = {
        latitude: '653.2451022',
        radius: 100,
        longitude: '-6.238335',
      };
      const fn = () => {
        createZone(zone).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as radius is null', function() {
      const zone = {
        latitude: '73.2451022',
        radius: null,
        longitude: '-6.238335',
      };
      const fn = () => {
        createZone(zone).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });

    it('Should throw an error as radius isn\'t present', function() {
      const zone = {
        latitude: '73.2451022',
        longitude: '-6.238335',
      };
      const fn = () => {
        createZone(zone).catch((e) => {
          throw e;
        });
      };
      assert.throws(fn, {name: /^Error$/});
    });
  });
});
