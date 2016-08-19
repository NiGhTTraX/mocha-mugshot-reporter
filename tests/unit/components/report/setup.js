
function _hasPassed(test) {
  return test.state === 'passed';
}

module.exports = function(data) {
  let numberOfPasses = 0,
      numberOfFailures = 0,
      duration = 0,
      suites = data;

  suites.forEach(function(suite) {
    suite.passes = suite.tests.filter(function(test) {
      return _hasPassed(test);
    });
    numberOfPasses += suite.passes.length;

    suite.failures = suite.tests.filter(function(test) {
      return !_hasPassed(test);
    });
    numberOfFailures += suite.failures.length;

    suite.tests.forEach(function(test) {
      duration += test.duration;
    });
  });

  return {
    suites: suites,
    numberOfPasses: numberOfPasses,
    numberOfFailures: numberOfFailures,
    duration: duration
  };
};
