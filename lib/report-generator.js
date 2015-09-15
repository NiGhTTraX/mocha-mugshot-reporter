var fs = require('fs'),
    path = require('path');
/**
 * The directory of the visual report
 *
 * @type {String}
 * @const
 * @default
 */
var DEFAULT_ROOT_DIRECTORY = 'visual-report';

/**
 * The directory of the static files
 *
 * @type {String}
 * @const
 * @default
 */
var STATIC_DIRECTORY = path.join(__dirname, '..', 'statics');

/**
 * The path of the data file
 *
 * @type {String}
 * @const
 * @default
 */
var DATA_PATH  = 'data.js';


function copyStatics(done) {
  fs.readdir(STATIC_DIRECTORY, function(error, files) {
    if (error) {
      return done(error);
    }

    files.forEach(function(file) {
      var inputPath = path.join(STATIC_DIRECTORY, file),
          outputPath = path.join(DEFAULT_ROOT_DIRECTORY, file);

      fs.createReadStream(inputPath).pipe(fs.createWriteStream(outputPath));
    });

    done();
  });
}

/**
 * Creates the files for the visual report
 *
 * @param {Array.<Suite>} data - The generated data from Mocha's runner
 * @param {generateReportCb} done - To notify when the report is created
 */
module.exports = function(data, done) {
  if (data === undefined) {
    throw new Error('No received data to create the "data.js" file');
  }

  if (done === undefined) {
    throw new Error('No received callback, to notify when report is created');
  }

  var output = 'var data = ' + JSON.stringify(data) + ';',
      outputPath = path.join(DEFAULT_ROOT_DIRECTORY, DATA_PATH);

  try {
    fs.mkdirSync(DEFAULT_ROOT_DIRECTORY);
  } catch(error) {
    if (error.code !== 'EEXIST') {
      return done(error);
    }
  }

  fs.writeFile(outputPath, output, function(error) {
    if (error) {
      return done(error);
    }

    copyStatics(done);
  });
}

/**
 * @callback generateReportCb
 *
 * @param error - Contains an Error instance or undefined
 */
