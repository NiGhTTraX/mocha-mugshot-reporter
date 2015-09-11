module.exports = {
  rootSuite: {
    title: ''
  },
  suite: {
    title: 'suite'
  },
  passTest: {
    title: 'test',
    state: 'passed'
  },
  failTest: {
    title: 'test',
    state: 'failed',
    err: new Error('big error')
  }
};
