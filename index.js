'use strict';

const os = require('os');
const fileManager = require('./lib/file_manager.js')();
const distanceCalculator = require('./lib/distance_calculator.js')();
const {createZone} = require('./models/');

/**
 * Option to declare file path in command line arguments
 * Example: node index ./data/customers.txt
 */
const filePath = process.argv[2] ? process.argv[2] : './data/customers.txt';
console.log(`Determing invitees from file ${filePath}`);
let interZone;
try {
  interZone = createZone({
    latitude: 53.339428,
    longitude: -6.257664,
    radius: 100,
  });
} catch (e) {
  console.log(`${e.message}`);
  process.exit();
}

fileManager.read(filePath, 'utf8')
    .then(fileManager.parse)
    .then(distanceFilter)
    .then(generateOutput)
    .then(fileManager.write.bind(null, 'output.txt'))
    .then(() => {
      console.log('Invitee list written to output.txt');
    })
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });

/**
 * Filter invite list using in range calculation from ./lib/distance_calculator
 * @param {Invitee[]} invitees - List of invitees to filter
 * @return {Invitee[]} Returns list of valid invitees
 */
function distanceFilter(invitees) {
  return invitees.filter((invitee) => {
    return distanceCalculator.inRange(interZone, invitee);
  });
}

/**
 * Sort final list then return string to save to file
 * OS based End Of Line characters are used to create new lines
 * @param {Invitee[]} invitees - Array containing party guests
 * @return {string} Array of invitees as a formatted string
 */
function generateOutput(invitees) {
  return invitees.sort((a, b) => a.user_id - b.user_id).join(os.EOL);
}

