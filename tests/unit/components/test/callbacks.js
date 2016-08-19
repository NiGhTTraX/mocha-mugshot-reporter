import Test from '../../../../ui/components/test.jsx';
import fixture from '../../../fixtures/components/test/passedTest.js';
import {render, stubMethod} from '../../helpers.js';

describe('Test', function() {

  describe('Callbacks', function() {
    let component;

    beforeEach(function() {
      stubMethod(Test, 'render', null);
      component = render(Test, fixture);
    });

    it('should change the state which toggles the test details', function() {
      component.onDetailsDisplay(false);
      expect(component.state.toggled).to.be.true;
    });
  });
});
