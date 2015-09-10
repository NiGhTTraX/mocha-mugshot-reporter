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
      ctx: {}
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
      paths: undefined
    },
    failTest = {
      title: 'test',
      status: false,
      error: undefined,
      paths: undefined
    };

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function generateArrayOfRandomNumbers(n) {
  var array = [];

  for (var i = 0; i < n; i++) {
    array.push(getRandomNumber());
  }

  return array;
}

function generateNGlobalSuites(n) {
  var suites = [rootSuite];

  for (var i = 0; i < n; i++)  {
    suites.push(objectAssign({}, globalSuite, {tests: []}));
  }

  return suites;
}

function generateNNestedSuites(n) {
  var suites = [rootSuite];

  for (var i = 0; i < n; i++) {
    suites.push(objectAssign({}, nestedSuite, {indent: i + 1}));
  }

  return suites;
}

function generateNGlobalSuitesWithVariableTests(n, randomNumbers, passOrFail) {
  var suites = generateNGlobalSuites(n);

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
        randomNumbers = generateArrayOfRandomNumbers(n),
        passOrFail = [];

    for (var i = 0; i < n; i++) {
      passOrFail.push(generateArrayOfRandomNumbers(randomNumbers[i]));
    }

    generate(runner, function(data) {
      var expected = generateNGlobalSuitesWithVariableTests(n, randomNumbers,
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
});

