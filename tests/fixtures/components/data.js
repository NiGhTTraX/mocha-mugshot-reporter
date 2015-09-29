var _ = require('lodash');

module.exports = [{
  title: '',
  indent: 0,
  tests: [{
    title: 'Test global',
    state: 'passed',
    duration: _.random(0, 100, true)
  }],
}, {
  title: 'Suite 1',
  indent: 1,
  tests: [{
    title: 'Test 1',
    state: 'failed',
    error: new Error('Big Error'),
    result: {
      isEqual: false,
      baseline: 'baslinePath',
      screenshot: 'screenshotPath',
      diff: 'diffPath'
    },
    duration: _.random(0, 100)
  }, {
    title: 'Test 2',
    state: 'passed',
    result: {
      isEqual: true,
      baseline: 'baselinePath'
    },
    duration: _.random(0, 100)
  }]
}, {
  title: 'Suite 2',
  indent: 1,
  tests: []
}];
