module.exports = {
  details: {
    paths: {
      isEqual: false,
      baseline: 'baslinePath',
      screenshot: 'screenshotPath',
      diff: 'diffPath'
    },
    error: {
      name: 'AssertionError',
      message: 'expected baseline and screenshot of ' +
          '{ name: \'baslinePath\' } to be identical'
    }
  }
};
