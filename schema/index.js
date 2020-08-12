/**
 * Simple class for exporting each Joi Schema in the current directory
 */

const path = require('path');
const dir = require('fs').readdirSync(__dirname + path.sep);

dir.forEach(function(filename) {
  if (path.extname(filename) === '.js' && filename !== 'index.js') {
    const exportAsName = path.basename(filename, '.js');
    module.exports[exportAsName] = require( path.join( __dirname, filename) );
  }
});