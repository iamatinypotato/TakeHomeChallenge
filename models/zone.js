const Location = require('./location.js');

class Zone extends Location {
  #radius;

  constructor(options) {
    super(options);
    this.#radius = options.radius;
  }

  get radius() {
    return this.#radius;
  }
}

module.exports = Zone;
