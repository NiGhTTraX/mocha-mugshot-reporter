var expect = require('chai').expect,
    Mocha = require('mocha'),
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
  var mocha = new Mocha(),
      stdout = process.stdout.write,
      result = [],
      mochaReporterOutput,
      mugshotReporterOutput;

  process.stdout.write = function (string) {
    result.push(string);
  };

  mocha.addFile(testFixturePath);

  mocha.reporter(reporter).run(function() {
    mochaReporterOutput = result.slice();
    result = [];

    mocha.reporter(mugshotReporter, {reporter: reporter}).run(function() {
      mugshotReporterOutput = result.slice();

      process.stdout.write = stdout;

      done(mochaReporterOutput.join(' '), mugshotReporterOutput.join(' '));
    });
  });
}

/**
 * @callback getOutputsCb
 * @param {String} mochaReporterOutput
 * @param {String} mugshotReporterOutput
 */

describe('Mocha-Mugshot CLI reporting', function() {
  var reporters = ['', 'spec', 'dot'];

  reporters.forEach(function(reporter) {
    var description =  (reporter === '') ? 'default' : reporter;

    it('should output the same with Mocha ' + description + ' reporter',
       function(done) {
      getOutputs(reporter, function(mochaReporterOutput,
         mugshotReporterOutput) {

        // delete the time (is variable)
        var mochaOutput  = mochaReporterOutput.replace(/\([0-9]+ms\)/i, '');
        var mugshotOutput  = mugshotReporterOutput.replace(/\([0-9]+ms\)/i, '');

        expect(mugshotOutput).to.be.equal(mochaOutput);

        done();
      });
    });
  });
});

