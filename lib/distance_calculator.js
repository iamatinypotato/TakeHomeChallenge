'use strict';

module.exports = function() {
  const earthRadius = 6371.0088;

  /**
  * Calculates whether the distance is in range of the party radius
  * @param {Zone} zone - Party Zone instance
  * @param {Invitee} invitee - Invitee instance
  * @return {bool} True if within range of party
  */
  function inRange(zone, invitee) {
    return calculateDistance(zone, invitee) < zone.radius;
  }

  /**
  * Calculates the distance in Kms
  * Based on central angle multiplied by earth's radius
  * @param {Zone} zone - Party Zone instance
  * @param {Invitee} invitee - Invitee instance
  * @return {number} Returns distance in Kms
  */
  function calculateDistance(zone, invitee) {
    return calculateAngle(zone, invitee) * earthRadius;
  }

  /**
  * Calculates the central angle between two geographical points
  * @param {Zone} zone - Party Zone instance
  * @param {Invitee} invitee - Invitee instance
  * @return {number} Returns the central angle in radians
  */
  function calculateAngle(zone, invitee) {
    if (typeof zone.latitude != 'number' ||
        typeof zone.longitude != 'number' ||
        typeof invitee.latitude != 'number' ||
        typeof invitee.longitude != 'number' ) {
      throw new Error(`InvalidArgumentException Calculate Angle NaN`);
    }

    if (!(zone.latitude > -90 && zone.latitude < 90) ||
        !(zone.longitude > -180 && zone.longitude < 180) ||
        !(invitee.latitude > -90 && invitee.latitude < 90) ||
        !(invitee.longitude > -180 && invitee.longitude < 180)) {
      throw new Error(`InvalidArgumentException Out of Range`);
    }

    const sinLat1 = Math.sin(zone.latitude);
    const sinLat2 = Math.sin(invitee.latitude);
    const cosLat1 = Math.cos(zone.latitude);
    const cosLat2 = Math.cos(invitee.latitude);

    const longitudeDelta = Math.abs(zone.longitude - invitee.longitude);
    const centralAngle = Math.acos((sinLat1 * sinLat2) +
      (cosLat1 * cosLat2 * Math.cos(longitudeDelta)));

    return centralAngle;
  }

  return {
    inRange,
    calculateDistance,
    calculateAngle,
  };
};
