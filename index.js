var reporters = require('mocha').reporters;

/**
 * Mocha reporter for Mugshot visual regression testing lib
 *
 * @param runner - Mocha's runner
 * @param {Object} options - Options object received from Mocha
 */
function MugshotReporter(runner, options) {
  var reporter = options.reporterOptions.reporter,
      CLIReporter = reporters[reporter];

  if (CLIReporter === undefined) {
    CLIReporter = reporters.Spec;
  }

  new CLIReporter(runner);
};

module.exports = MugshotReporter;
