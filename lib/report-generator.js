var fs = require('fs'),
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
var STATIC_DIRECTORY = path.join(__dirname, '..', 'statics');

/**
 * The path of the data file
 *
 * @type {String}
 * @const
 * @default
 */
var DATA_PATH  = 'data.js';

/**
 * The root directory
 *
 * @type {String}
 */
var ROOT_DIRECTORY;


function copyStatics(done) {
  fs.readdir(STATIC_DIRECTORY, function(error, files) {
    if (error) {
      return done(error);
    }

    files.forEach(function(file) {
      var inputPath = path.join(STATIC_DIRECTORY, file),
          outputPath = path.join(ROOT_DIRECTORY, file);

      fs.createReadStream(inputPath).pipe(fs.createWriteStream(outputPath));
    });

    done();
  });
}

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

  ROOT_DIRECTORY = options.rootDirectory || DIRECTORY_PATH;

  var output = 'var data = ' + JSON.stringify(data) + ';',
      outputPath = path.join(ROOT_DIRECTORY, DATA_PATH);

  try {
    fs.mkdirSync(ROOT_DIRECTORY);
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
