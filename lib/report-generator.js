var fs = require('fs'),
    path = require('path');
/**
 * The directory of the visual report
 *
 * @type {String}
 * @const
 * @default
 */
var rootDirectory = 'visual-report';

/**
 * The path of the data file
 *
 * @type {String}
 * @const
 * @default
 */
var dataPath = 'data.js';

/**
 * Creates the files for the visual report
 *
 * @param {Array.<Suite>} data - The generated data from Mocha's runner
 * @param {generateReportCb} done - To notify when the report is created
 */
module.exports = function(data, done) {
  if (data === undefined) {
    throw new Error('No recevied data to create the "data.js" file');
  }

  if (done === undefined) {
    throw new Error('No received callback, to notify when report is created');
  }

  var output = 'var data = ' + JSON.stringify(data) + ';';

  try {
    fs.mkdirSync(rootDirectory);
  } catch(error) {
    if (error.code !== 'EEXIST') {
      return done(error);
    }
  }

  fs.writeFile(path.join(rootDirectory, dataPath), output, function(error) {
    if (error) {
      return done(error);
    }

    done();
  });
}

/**
 * @callback generateReportCb
 *
 * @param error - Contains an Error instance or undefined
 */
