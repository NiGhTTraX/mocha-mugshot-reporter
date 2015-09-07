var expect = require('chai').expect,
    exec = require('child_process').exec,
    path = require('path');

var testFixturePath = path.join(__dirname, '../test-fixture.js'),
    mugshotReporter = path.join(__dirname, '../../index.js');

/**
 * Captures the output of the reporters, i.e Mocha's reporters and our reporter
 *
 * @param {String} reporter - The name of the wanted reporter to test
 * @param {getOutputsCb} done - Called after all operations have finished
 */
function getOutputs(reporter, done) {
  var command = 'mocha ' + testFixturePath + ' --reporter=';

  exec(command + reporter, function(error, mochaReporterOutput) {
    if (error) {
      return done(error);
    }

    exec(command + mugshotReporter + ' --reporter-options reporter=' + reporter,
       function(error, mugshotReporterOutput) {
      if (error) {
        return done(error);
      }

      done(null, mochaReporterOutput, mugshotReporterOutput);
    });
  });
}

/**
 * @callback getOutputsCb
 * @param error
 * @param {String} mochaReporterOutput
 * @param {String} mugshotReporterOutput
 */

describe('Mocha-Mugshot CLI reporting', function() {
  var reporters = ['', 'spec', 'dot'];

  reporters.forEach(function(reporter) {
    it('should output the same with Mocha ' + ((reporter === '') ? 'default' :
       reporter) + ' reporter', function(done) {
      getOutputs(reporter, function(error, mochaReporterOutput,
         mugshotReporterOutput) {
        if (error) {
          throw error;
        }

        // slice out the time
        expected = mochaReporterOutput.slice(0,
          (mochaReporterOutput.search('passing') - 1));

        result = mugshotReporterOutput.slice(0,
          (mugshotReporterOutput.search('passing') - 1));

        expect(expected).to.be.deep.equal(result);

        done();
      });
    });
  });
});


