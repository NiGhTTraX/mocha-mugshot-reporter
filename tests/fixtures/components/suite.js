var _ = require('lodash');

module.exports = {
  title: 'Suite 1',
  indent: _.random(0, 100),
  tests: [{
    title: 'Test 1',
    state: 'failed',
    error: new Error('Big Error'),
    result: {
      isEqual: false,
      basline: 'baselinePathi1',
      screenshot: 'screenshotPath',
      diff: 'diffPath'
    },
    duration: 7
  }, {
    title: 'Test 2',
    state: 'passed',
    result: {
      isEqual: true,
      baseline: 'baselinePath2'
    },
    duration: 1.5
  }]
};
