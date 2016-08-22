import _ from 'lodash';

let passedTestDuration = _.random(0, 100, true);
let failedTestDuration = _.random(0, 100, true);

export default {
  suites: [{}, {
    title: 'Suite 1',
    indent: _.random(0, 100),
    tests: [{
      title: 'Test 1',
      state: 'failed',
      error: {
        name: 'AssertionError',
        message: 'expected baseline and screenshot of ' +
            '{ name: \'baslinePath\' } to be identical'
      },
      result: {
        isEqual: false,
        baseline: 'baslinePath',
        screenshot: 'screenshotPath',
        diff: 'diffPath'
      },
      duration: failedTestDuration
    }, {
      title: 'Test 2',
      state: 'passed',
      result: {
        isEqual: true,
        baseline: 'baselinePath'
      },
      duration: passedTestDuration
    }],
    passes: [{
      title: 'Test 2',
      state: 'passed',
      result: {
        isEqual: true,
        baseline: 'baselinePath'
      },
      duration: passedTestDuration
    }],
    failures: [{
      title: 'Test 1',
      state: 'failed',
      error: {},
      result: {
        isEqual: false,
        baseline: 'baslinePath',
        screenshot: 'screenshotPath',
        diff: 'diffPath'
      },
      duration: failedTestDuration
    }]
  }, {
    title: 'Suite 2',
    indent: _.random(0, 100),
    tests: [],
    passes: [],
    failures: []
  }],
  filter: 'all'
};
