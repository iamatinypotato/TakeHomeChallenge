class Location {
  #latitude;
  #longitude;

  constructor(options) {
    if(!(options.latitude > -90 && options.latitude < 90))
      throw new Error(`InvalidArgumentException latitude ${options.latitude}`);
    if(!(options.longitude > -180 && options.longitude < 180))
      throw new Error(`InvalidArgumentException longitude ${options.longitude}`);

    this.#latitude = options.latitude;
    this.#longitude = options.longitude;
  }

  // Convert to Radeons
  get latitude() {
    return this.#latitude * Math.PI / 180;
  }

  // Convert to Radeons
  get longitude() {
    return this.#longitude * Math.PI / 180;
  }
}

module.exports = Location;
