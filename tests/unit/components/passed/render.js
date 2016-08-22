import Passed from '../../../../ui/components/passed.jsx';
import fixture from '../../../fixtures/components/passed/passed.js';
import {render} from '../../helpers.js';

describe('Passed', function() {
  describe('Render', function() {
    let component;

    beforeEach(function() {
      component = render(Passed, fixture);
    });

    it('should display the baseline image', function() {
      expect(component.refs.baseline.src).to.equal(fixture.paths.baseline);
    });
  });
});
