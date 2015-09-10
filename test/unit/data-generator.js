var expect = require('chai').expect,
    objectAssign = require('object-assign'),
    generate = require('../../lib/data-generator.js'),
    EventEmitter = require('events').EventEmitter;

var root = {
      title: ''
    },
    suite = {
      title: 'suite'
    },
    test = {
      title: 'test',
      ctx: {},
      err: 'error'
    },
    rootSuite = {
      title: '',
      indent: 0,
      tests: []
    },
    globalSuite = {
      title: 'suite',
      indent: 1,
      tests: []
    },
    nestedSuite = {
      title: 'suite',
      indent: 2,
      tests: []
    },
    passTest = {
      title: 'test',
      status: true,
      result: undefined
    },
    failTest = {
      title: 'test',
      status: false,
      error: 'error',
      result: undefined
    };

/**
 * Generates a natural strictly positive number
 *
 * @returns {Number}
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

/**
 * Generates an array of n random numbers
 *
 * @param {Number} n
 *
 * @returns {Array.<Number>}
 */
function generateArrayOfRandomNumbers(n) {
  var array = [];

  for (var i = 0; i < n; i++) {
    array.push(getRandomNumber());
  }

  return array;
}

/**
 * Generates n global suites (Mocha's describe)
 *
 * @param {Number} n
 *
 * @returns {Array.<Suite>}
 */
function generateNGlobalSuites(n) {
  var suites = [rootSuite];

  for (var i = 0; i < n; i++)  {
    suites.push(objectAssign({}, globalSuite, {tests: []}));
  }

  return suites;
}

/**
 * Generates n neste suites (Mocha's describe)
 *
 * @param {Number} n
 *
 * @returns {Array.<Suite>}
 */
function generateNNestedSuites(n) {
  var suites = [rootSuite];

  for (var i = 0; i < n; i++) {
    suites.push(objectAssign({}, nestedSuite, {indent: i + 1}, {tests: []}));
  }

  return suites;
}

/**
 * Generates an array of n suites with a variable number of tests
 *
 * @param {Number} n - Number of suites
 * @param {Boolean} nested - If nested or global
 * @param {Array.<Number>} randomNumbers - Test number for each suite
 * @param {Array.<Number>} passOrFail - A number for each test of a suite,
 *    even => pass, odd => fail
 *
 * @returns {Array.<Suites>}
 */
function generateNSuitesWithVariableTests(n, nested,
    randomNumbers, passOrFail) {
  var suites = nested ? generateNNestedSuites(n) : generateNGlobalSuites(n);

  for (var i = 1; i < suites.length; i++) {
    for (var j = 0; j < randomNumbers[i - 1]; j++) {
      if (passOrFail[i - 1][j] % 2 === 0) {
        suites[i].tests.push(passTest);
      } else {
        suites[i].tests.push(failTest);
      }
    }
  }

  return suites;
}

/**
 * Generates n global tests (Mocha's it with no describe)
 *
 * @param {Number} n - Number of tests
 * @param {Array.<Number>} randomNumbers - A number for each global test,
 *    even => pass, odd => fail
 *
 * @returns {Array.<Test>}
 */
function generateNGlobalTests(n, randomNumbers) {
  var tests = [];

  for (var i = 0; i < n; i++) {
    if (randomNumbers[i] % 2 === 0) {
      tests.push(passTest);
    } else {
      tests.push(failTest);
    }
  }

  return tests;
}

/*function generateNRandom(n, randomNumbers, passOrFail) {
  var random = [rootSuite];

  for (var i = 0; i < n; i++) {
    if (randomNumers[i] % 3 === 0) {
      random.push(globalSuite);
    } else if (randomNumbers[i] % 3 === 1) {
      random.push(*/

describe('Data generator', function() {
  var runner;

  beforeEach(function() {
    runner = new EventEmitter();
  });

  it('should generate only the rootSuite', function(done) {
    generate(runner, function(data) {
      expect(data).to.be.deep.equal([rootSuite]);

      done();
    });

    runner.emit('suite', root);
    runner.emit('suite end', root);
    runner.emit('end');
  });

  it('should generate the rootSuite with random global tests', function(done) {
    var n = getRandomNumber(),
        randomNumbers = generateArrayOfRandomNumbers(n);

    generate(runner, function(data) {
      var tests = generateNGlobalTests(n, randomNumbers),
          expected = [objectAssign({}, rootSuite, {tests: tests})];

    expect(data).to.be.deep.equal(expected);

      done();
    });

    runner.emit('suite', root);

    for (var i = 0; i < n; i++) {
      if (randomNumbers[i] % 2 === 0) {
        runner.emit('pass', test);
      } else {
        runner.emit('fail', test);
      }
    }

    runner.emit('suite end', root);
    runner.emit('end');
  });


  it('should generate n void global suites', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var expected = generateNGlobalSuites(randomNumber);

      expect(data).to.be.deep.equal(expected);

      done();
    });

    runner.emit('suite', root);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite', suite);
      runner.emit('suite end', suite);
    };

    runner.emit('suite end', root);
    runner.emit('end');
  });

  it('should generate n void nested suites', function(done) {
    var randomNumber = getRandomNumber();

    generate(runner, function(data) {
      var expected = generateNNestedSuites(randomNumber);

      expect(data).to.be.deep.equal(expected);

      done();
    });

    runner.emit('suite', root);

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite', suite);
    }

    for (var i = 0; i < randomNumber; i++) {
      runner.emit('suite end', suite);
    }

    runner.emit('suite end', root);
    runner.emit('end');
  });

  it('should generate n global suites with random tests', function(done) {
    var n = getRandomNumber(),
        // Each value is the number of tests of the suite i.
        randomNumbers = generateArrayOfRandomNumbers(n),
        // It will be a matrix, i.e [ [], ..., [] ], every array, will have
        // randomNumbers[i] length, telling how many tests will pass or fail.
        passOrFail = [];

    for (var i = 0; i < n; i++) {
      passOrFail.push(generateArrayOfRandomNumbers(randomNumbers[i]));
    }

    generate(runner, function(data) {
      var expected = generateNSuitesWithVariableTests(n, false, randomNumbers,
        passOrFail);

      expect(data).to.be.deep.equal(expected);

      done();
    });

    runner.emit('suite', root);

    for (var i = 0; i < n; i++) {
      runner.emit('suite', suite);

      for (var j = 0; j < randomNumbers[i]; j++) {
        if (passOrFail[i][j] % 2 === 0) {
          runner.emit('pass', test);
        } else {
          runner.emit('fail', test);
        }
      }
      runner.emit('suite end');
    }

    runner.emit('suite end', root);
    runner.emit('end');
  });

  it('should generate n nested suites with random tests', function(done) {
    var n = getRandomNumber(),
        randomNumbers = generateArrayOfRandomNumbers(n),
        passOrFail = [];

    for (var i = 0; i < n; i++) {
      passOrFail.push(generateArrayOfRandomNumbers(randomNumbers[i]));
    }

    generate(runner, function(data) {
      var expected = generateNSuitesWithVariableTests(n, true, randomNumbers,
        passOrFail);

      expect(data).to.be.deep.equal(expected);

      done();
    });

    runner.emit('suite', root);

    for (var i = 0; i < n; i++) {
      runner.emit('suite', suite);

      for (var j = 0; j < randomNumbers[i]; j++) {
        if (passOrFail[i][j] % 2 === 0) {
          runner.emit('pass', test);
        } else {
          runner.emit('fail', test);
        }
      }
    }

    for (var i = 0; i < n; i++) {
      runner.emit('suite end');
    }

    runner.emit('suite end', root);
    runner.emit('end');
  });

  it('should contain also the Mugshot\'s result if it is set on Mocha\'s this',
     function(done) {
    generate(runner, function(data) {
      var expected = [rootSuite, objectAssign({}, globalSuite, {
        tests: [objectAssign({}, passTest, {result: 'paths'})]
      })];

      expect(data).to.be.deep.equal(expected);

      done();
    });

    var t = objectAssign({}, test);
    t.ctx.result = 'paths';

    runner.emit('suite', root);
    runner.emit('suite', suite);
    runner.emit('pass', t);
    runner.emit('suite end', suite);
    runner.emit('suite end', root);
    runner.emit('end');
  });
});

