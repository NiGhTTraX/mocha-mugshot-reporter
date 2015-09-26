var _ = require('lodash');

module.exports = {
  title: 'Suite 1',
  indent: _.random(0, 100),
  tests: [{
    title: 'Test 1',
    state: 'failed',
    error: new Error('Big Error'),
    duration: 7
  }, {
    title: 'Test 2',
    state: 'passed',
    duration: 1.5
  }]
};
