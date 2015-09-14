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
    }
  },
  failTest: {
    title: 'test',
    state: 'failed',
    result: {
      isEqual: false
    },
    error: new Error('big error')
  }
};
