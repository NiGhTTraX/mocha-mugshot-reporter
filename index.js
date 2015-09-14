var reporters = require('mocha').reporters,
    generate = require('./lib/data-generator.js'),
    fs = require('fs'),
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
 * Mocha reporter for Mugshot visual regression testing lib
 *
 * @param {Mocha.Runner} runner - Mocha's runner
 * @param {Object} options - Options object received from Mocha
 */
function MugshotReporter(runner, options) {
  var reporter, CLIReporter;

  if (options.reporterOptions !== undefined) {
    reporter = options.reporterOptions.reporter;
  }

  CLIReporter = reporters[reporter];

  if (CLIReporter === undefined) {
    CLIReporter = reporters.Spec;
  }

  new CLIReporter(runner);

  try {
    fs.mkdirSync(rootDirectory);
  } catch(error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  generate(runner, function(data) {
    this.data = data;
  }.bind(this));
};

module.exports = MugshotReporter;

MugshotReporter.prototype.done = function(failures, fn) {
  var output = 'var data = ' + JSON.stringify(this.data) + ';';

  fs.writeFile(path.join(rootDirectory, dataPath), output, function(error) {
    if (error) {
      throw error;
    }

    fn(failures);
  });
}
