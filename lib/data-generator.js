/**
 * Generates the data received from Mocha's runner under a
 * standard format for the html report
 *
 * @param {Mocha.runner} runner - Mocha's runner
 * @param {generateCb} done
 */
module.exports = function(runner, done) {
  var indentLevel = -1,
      suites = [];

  runner.on('suite', function(suite) {
    suites.push({
      title: suite.title,
      indent: ++indentLevel,
      tests: []
    });
  });

  runner.on('pass', function(test) {
    suites[suites.length -1].tests.push({
      title: test.title,
      status: true,
      result: test.ctx.result
    });
  });

  runner.on('fail', function(test) {
    suites[suites.length -1].tests.push({
      title: test.title,
      status: false,
      error: test.err,
      result: test.ctx.result
    });
  });

  runner.on('suite end', function(suite) {
    indentLevel--;
  });

  runner.on('end', function() {
    done(suites);
  });
}

/**
 * The test representing Mocha's "it"
 *
 * @typedef {Object} Test
 * @property {String} title - The description of the test
 * @property {Boolean} status - True => pass and false => fail
 * @property {Object} error - The error in case the test has failed
 * @property {Object} result - The result returned by
 *    [Mugshot]{@link https://github.com/uberVU/mugshot}
 */

/**
 * The suite representing the Mocha's "describe"
 *
 * @typedef {Object} Suite
 * @property {String} title - The description of the suite
 * @property {Array.<Test>} tests - An array with the tests of the suite
 */

/**
 * @callback generateCb
 * @param {Array.<Suite>} suites - The suites from the test files
 */
