var reporters = require('mocha').reporters,
    generateData = require('./lib/data-generator.js'),
    generateReport = require('./lib/report-generator.js');

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

  generateData(runner, function(data) {
    this.data = data;
  }.bind(this));
};

MugshotReporter.prototype.done = function(failures, fn) {
  generateReport(this.data, {}, function(error) {
    if (error) {
      throw error;
    }

    fn(failures);
  });
}

module.exports = MugshotReporter;
