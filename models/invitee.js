const Location = require('./location.js');

class Invitee extends Location {
  #user_id;
  #name;

  constructor(options) {
    super(options);
    this.#user_id = options.user_id;
    this.#name = options.name;
  }

  get user_id() {
    return this.#user_id;
  }

  // Override toString()
  toString(){
    return `[ ${this.#user_id} ] \t${this.#name}`;
  }
}

module.exports = Invitee;
