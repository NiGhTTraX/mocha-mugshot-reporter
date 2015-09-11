module.exports = {
  rootSuite: {
    title: ''
  },
  suite: {
    title: 'suite'
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
