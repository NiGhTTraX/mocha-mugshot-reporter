module.exports = [{
  title: 'Test 1',
  state: 'passed',
  result: {
    isEqual: true,
    baseline: 'baselinePath 1'
  },
  duration: 7
}, {
  title: 'Test 2',
  state: 'failed',
  result: {
    isEqual: false,
    basline: 'baselinePath 2',
    screenshot: 'screenshotPath',
    diff: 'diffPath'
  },
  duration: 10
}];
