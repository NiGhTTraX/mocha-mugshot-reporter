import DefaultView from '../../../../../ui/components/views/defaultView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render} from '../../../helpers.js';

describe('DefaultView', function() {

  describe('Render', function() {
    let component;

    beforeEach(function() {
      component = render(DefaultView, fixture);
    });

    it('should display the diff image', function() {
      expect(component.refs.diff.src).to.equal(fixture.paths.diff);
    });
  });
});
