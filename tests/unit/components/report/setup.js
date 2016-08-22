const _hasPassed = test => {
  return test.state === 'passed';
};

const _hasFailed = test => {
  return test.state === 'failed';
};

const _getSuiteDuration = tests => tests.reduce(
  (acc, {duration}) => acc += duration, 0);

module.exports = function(data) {
  let numberOfPasses = 0,
      numberOfFailures = 0,
      duration = 0,
      suites = [];

  data.forEach(function(item) {
    const tests = item.tests,
          passes = tests.filter(_hasPassed),
          failures = tests.filter(_hasFailed),
          suite = Object.assign({}, item, {passes, failures});

    suites.push(suite);
    numberOfPasses += passes.length;
    numberOfFailures += failures.length;
    duration += _getSuiteDuration(suite.tests);
  });

  return {suites, numberOfPasses, numberOfFailures, duration};
};
