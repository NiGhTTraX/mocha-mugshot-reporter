describe('Suite 1', function() {
  it('Test 1 in Suite 1', function() {
  });

  describe('Suite 1.1', function() {
    it('Test 1 in Suite 1.1', function() {
    });
  });

  it('Test 2 in Suite 1', function() {
    throw new Error('error');
  });
});

describe('Suite 2', function() {
  it('Test 1 in Suite 2', function() {
  });
});
