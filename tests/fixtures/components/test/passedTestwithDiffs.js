import _ from 'lodash';

export default {
  test: {
    title: 'Test 1',
    state: 'passed',
    error: undefined,
    result: {
      isEqual: false,
      baseline: 'baslinePath',
      screenshot: 'screenshotPath',
      diff: 'diffPath'
    },
    duration: _.random(0, 100)
  },
  key: 0
};
