'use strict';
const path = require('path');
/**
 * Generates the data received from Mocha's runner under a
 * standard format for the html report
 *
 * @param {Mocha.runner} runner - Mocha's runner
 * @param {generateCb} done
 */
module.exports = function(runner, done) {
  let indentLevel = -1,
      suites = [];

  runner.on('suite', function(suite) {
    suites.push({
      title: suite.title,
      indent: ++indentLevel,
      tests: []
    });
  });

  runner.on('test end', function(test) {
    let error,
        result = test.ctx.result;

    // go to the main directory to get the assets
    if (result) {
      let baseline = result.baseline,
          screenshot = result.screenshot,
          diff = result.diff;

      if (baseline) {
        result.baseline = path.join('..', '..', baseline);
      }
      if (screenshot) {
        result.screenshot = path.join('..', '..', screenshot);
      }
      if (diff) {
        result.diff = path.join('..', '..', diff);
      }
    }

    if (test.err !== undefined) {
      error = {name: test.err.name, message: test.err.message};
    }

    suites[suites.length - 1].tests.push({
      title: test.title,
      state: test.state,
      result: result,
      error: error,
      duration: test.duration
    });
  });

  runner.on('suite end', function() {
    indentLevel--;
  });

  runner.on('end', function() {
    done(suites);
  });
};

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
