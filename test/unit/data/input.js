module.exports = {
  rootSuite: {
    title: ''
  },
  suite: {
    title: 'suite'
  },
  passTest: {
    title: 'test',
    state: 'passed',
    ctx: {
      result: {
        isEqual: true
      }
    },
    duration: 7
  },
  failTest: {
    title: 'test',
    state: 'failed',
    ctx: {
      result: {
        isEqual: false
      }
    },
    err: new Error('big error'),
    duration: 1.5
  }
};
