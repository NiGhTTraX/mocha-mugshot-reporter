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
    status: true
  },
  failTest: {
    title: 'test',
    status: false,
    error: new Error('big error')
  }
};
