var expect = require('chai').expect,
    objectAssign = require('object-assign'),
    _ = require('lodash'),
    generate = require('../../lib/data-generator.js'),
    EventEmitter = require('events').EventEmitter;

var input = require('./data/input.js'),
    output = require('./data/output.js');

/**
* Generates a natural positive number
*
* @returns {Number}
 */
function getRandomNumber() {
  return _.random(0, 100);
}

/**
 * Generates an array of random numbers
 *
 * @param {Number} n - The length of the array
 *
 * @returns {Array.<Number>}
 */
function generateArrayOfRandomNumbers(n) {
  return _.times(n, function() { return getRandomNumber(); });
}

/**
 * Generates suites (Mocha's describe)
 *
 * @param {Number} n - Number of suites
 * @param {String} type - Nested or global
 *
 * @returns {Array.<Suite>}
 */
function generateSuites(n, type) {
  var suites = [output.rootSuite];

  for (var i = 0; i < n; i++) {
    if (type === 'nested') {
      suites.push(objectAssign({}, output.suite, {indent: i + 1},
          {tests: []}));
    } else {
      suites.push(objectAssign({}, output.suite, {tests: []}));
    }
  }

  return suites;
}

/**
 * Generates tests (Mocha's it)
 *
 * @param {Number} n - Number of tests
 * @param {String} type - Passed or failed
 *
 * @returns {Array.<Test>}
 */
function generateTests(n, type) {
  var tests = [];

  for (var i = 0; i < n; i++) {
    if (type === 'passed') {
      tests.push(objectAssign({}, output.passTest));
    } else {
      tests.push(objectAssign({}, output.failTest));
    }
  }

  return tests;
}

describe('Data generator', function() {
  var runner;

  beforeEach(function() {
    runner = new EventEmitter();
  });

  it('should work with files without tests', function(done) {
    generate(runner, function(data) {
      expect(data).to.be.deep.equal([output.rootSuite]);

      done();
    });

    runner.emit('suite', input.rootSuite);
    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });

  it('should generate a Test for each of Mocha\'s passed it', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var tests = generateTests(randomNumber, 'passed'),
          expected = [objectAssign({}, output.rootSuite, {tests: tests})];

      expect(data.length).to.be.equal(expected.length);

      done();
    });

    runner.emit('suite',input.rootSuite);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('test end', input.passTest);
    }

    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });

  it('should generate a Test for each of Mocha\'s failed it', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var tests = generateTests(randomNumber, 'failed'),
          expected = [objectAssign({}, output.rootSuite, {tests: tests})];

      expect(data.length).to.be.deep.equal(expected.length);

      done();
    });

    runner.emit('suite',input.rootSuite);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('test end', input.failTest);
    }

    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });

  it('should generate a Suite for each of Mocha\'s describe', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var expected = generateSuites(randomNumber, 'global');

      expect(data.length).to.be.deep.equal(expected.length);

      done();
    });

    runner.emit('suite', input.rootSuite);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite', input.suite);
      runner.emit('suite end', input.suite);
    };

    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });

  it('should indent nested suites properly', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var expected = generateSuites(randomNumber, 'nested');

      for (var i = 0; i <= randomNumber; i++) {
        expect(data[i].indent).to.be.equal(expected[i].indent);
      }

      done();
    });

    runner.emit('suite', input.rootSuite);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite', input.suite);
    }

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite end', input.suite);
    }

    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });

  it('should maintain the order in which the tests are executed',
     function(done) {
    var n = getRandomNumber(),
        // Each value is the number of tests of the suite i.
        randomNumbers = generateArrayOfRandomNumbers(n + 1);

    generate(runner, function(data) {
      var expected = generateSuites(n, 'global');

      for (var i = 0; i <= n; i++) {
        expected[i].tests = generateTests(randomNumbers[i], 'passed');

        // We are adding in the title an id only for testing purposes.
        for (var j = 0; j < expected[i].tests.length; j++) {
          expected[i].tests[j].title += j;
        }
      }

      for (var i = 0; i <= n; i++) {
        for (var j = 0; j < randomNumbers[i]; j++) {
          expect(data[i].tests[j].title).to.be.equal(expected[i].tests[j].title);
        }
      }

      done();
    });

    runner.emit('suite', input.rootSuite);
    for (var i = 0; i < randomNumbers[0]; i++) {
      var test = objectAssign({}, input.passTest);

      test.title += i;
      runner.emit('test end', test);
    }

    for (var i = 1; i <= n; i++) {
      runner.emit('suite', input.suite);

      for (var j = 0; j < randomNumbers[i]; j++) {
        var test = objectAssign({}, input.passTest);

        test.title += j;
        runner.emit('test end', test);
      }

      runner.emit('suite end');
    }

    runner.emit('suite end', input.rootSuite);
    runner.emit('end');
  });
});
