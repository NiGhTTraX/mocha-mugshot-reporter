import Details from '../../../../ui/components/details.jsx';
import fixture from '../../../fixtures/components/passed/details.js';
import {render} from '../../helpers.js';

describe('Passed', function() {
  describe('Render', function() {
    let component;

    beforeEach(function() {
      component = render(Details, fixture);
    });

    it('should display the baseline image', function() {
      expect(component.refs.baseline.src).to.equal(fixture.paths.baseline);
    });
  });
});
