import DetailsWithDiff from '../../../../ui/components/details-diff.jsx';
import fixture from '../../../fixtures/components/failed/details-diff.js';
import {render, stubMethod} from '../../helpers.js';

describe('Failed', function() {
  describe('Callbacks', function() {
    let component;

    beforeEach(function() {
      stubMethod(DetailsWithDiff, 'render', null);
      component = render(DetailsWithDiff, fixture);
    });

    DetailsWithDiff.VIEWS.forEach(function(item) {
      it(`should change the view to ${item.name}`, function() {
        const view = item.name;

        component.onViewChange({target: {name: view}});
        expect(component.state.view).to.equal(view);
      });
    });

    it('should change the state which toggles the error message', function() {
      component.onErrorMessageOpen(false);
      expect(component.state.openError).to.be.true;
    });
  });
});
