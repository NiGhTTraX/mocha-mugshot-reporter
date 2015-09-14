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
    state: 'passed'
  },
  failTest: {
    title: 'test',
    state: 'failed',
    error: new Error('big error')
  }
};
