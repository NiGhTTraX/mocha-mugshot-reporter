module.exports = {
  rootSuite: {
    title: '',
    indent: 0,
    tests: []
  },
  suite: {
    title: 'suite',
    indent: 1,
    tests: []
  },
  passTest: {
    title: 'test',
    state: 'passed',
    result: {
      isEqual: true
    },
    duration: 7
  },
  failTest: {
    title: 'test',
    state: 'failed',
    result: {
      isEqual: false
    },
    error: new Error('big error'),
    duration: 1.5
  }
};
