var fs = require('fs-extra'),
    path = require('path');

/**
 * The directory of the visual report
 *
 * @type {String}
 * @const
 * @default
 */
var DIRECTORY_PATH = 'visual-report';

/**
 * The directory of the static files
 *
 * @type {String}
 * @const
 * @default
 */
var STATIC_DIRECTORY = 'statics';

/**
 * The path of the data file
 *
 * @type {String}
 * @const
 * @default
 */
var DATA_PATH = 'data.js';

/**
 * Creates the files for the visual report
 *
 * @param {Array.<Suite>} data - The generated data from Mocha's runner
 * @param {Object} options - Options object
 * @param {String} options.rootDirectory - The directory of the visual report
 * @param {generateReportCb} done - Cb to notify when the report is created
 */
module.exports = function(data, options, done) {
  if (data === undefined) {
    throw new Error('No received data to create the "data.js" file');
  }

  if (typeof options === 'function') {
    done = options;
  }

  if (done === undefined) {
    throw new Error('No received callback, to notify when report is created');
  }

  var rootDirectory = options.rootDirectory || DIRECTORY_PATH;

  try {
    fs.mkdirSync(rootDirectory);
  } catch(error) {
    if (error.code !== 'EEXIST') {
      return done(error);
    }
  }

  var output = 'var data = ' + JSON.stringify(data) + ';',
      outputPath = path.join(rootDirectory, DATA_PATH);

  fs.writeFile(outputPath, output, function(error) {
    if (error) {
      return done(error);
    }

    var source = path.join(__dirname, '..', STATIC_DIRECTORY),
        destination = path.join(rootDirectory, STATIC_DIRECTORY);

    fs.copy(source, destination, function(error) {
      if (error) {
        return done(error);
      }

      done(null);
    });
  });
}

/**
 * @callback generateReportCb
 *
 * @param error - Contains an Error instance or undefined
 */
