import TwoUpView from '../../../../../ui/components/views/twoUpView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render} from '../../../helpers.js';

describe('TwoUpView', function() {
  describe('Render', function() {
    let component;

    beforeEach(function() {
      component = render(TwoUpView, fixture);
    });

    it('should display the baseline image', function() {
      expect(component.refs.baseline.src).to.equal(fixture.paths.baseline);
    });

    it('should display the screenshot image', function() {
      expect(component.refs.screenshot.src).to.equal(fixture.paths.screenshot);
    });
  });
});
