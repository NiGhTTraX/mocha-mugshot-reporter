module.exports =
[
  {
    title: '',
    indent: 0,
    tests:
    [
      {
        title: 'Test global',
        state: 'passed',
        duration: 155
      }
    ]
  },
  {
    title: 'Suite 1',
    indent: 1,
    tests:
    [
      {
        title: 'Test 1',
        state: 'failed',
        error: new Error('Big Error'),
        duration: 7
      },
      {
        title: 'Test 2',
        state: 'passed',
        duration: 1.5
      }
    ]
  }
];
