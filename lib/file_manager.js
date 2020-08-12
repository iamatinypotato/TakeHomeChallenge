'use strict';

const os = require('os');
const fs = require('fs').promises;
const {createInvitee} = require('../models/');

module.exports = function() {
  /**
   * Read Text from Customer List Text file
   * @param {string} filePath Path to file
   * @param {string} [encoding=utf8] File encoding [optional]
   * @return {Promise<string>} The data from the file
   */
  async function read(filePath, encoding = 'utf8') {
    try {
      return await fs.readFile(filePath, encoding);
    } catch (err) {
      throw new Error(`Error reading file ${filePath}`);
    }
  }

  /**
   * Parse JSON data from file to array of Invitees
   * @param {string} data File Text
   * @return {Promise<Invitee[]>} Validated list of customers
   */
  async function parse(data) {
    const lines = data.trim().split(os.EOL); // Split by Operating System EOL

    const customers = lines.reduce((arr, line, idx) => {
      if (line == '') return arr; // Allow for empty lines
      let invitee = {};
      try {
        invitee = JSON.parse(line);
      } catch (e) { // Catch any specific JSON parse errors
        throw new Error(`Error parsing JSON txt file at line ${idx}`);
      }
      arr.push(createInvitee(invitee));
      return arr;
    }, []);

    if (customers.length == 0) {
      throw new Error(`Error no customers present in txt file.`);
    }

    return customers;
  }

  /**
   * Write to file
   * @param {string} filename - name of output file to write to
   * @param {string} data - Text array to write to file
   * @example
   * write('output.txt', 'Hello World')
   * @return {Promise} A promise which resolves on an successful write
   */
  function write(filename, data = '') {
    return fs.writeFile(filename, data, {flag: 'w+'});
  }

  return {
    read,
    parse,
    write,
  };
};
