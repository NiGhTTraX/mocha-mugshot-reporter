import DetailsWithDiff from '../../../../ui/components/details-diff.jsx';
import fixture from '../../../fixtures/components/failed/details-diff.js';
import {render, stubMethod, getChildProps} from '../../helpers.js';

describe('Failed', function() {
  describe('Children', function() {
    const paths = fixture.paths;
    let props, component;

    beforeEach(function() {
      stubMethod(DetailsWithDiff, 'render', null);
      component = render(DetailsWithDiff, fixture);
    });

    DetailsWithDiff.VIEWS.forEach(function(item) {
      it(`should pass the component & the paths to the ${item.name} view child`,
        function() {
          const viewComponent = item.component;

          props = getChildProps(component, 'view', [viewComponent, paths]);
          expect(props.component).to.equal(viewComponent);
          expect(props.paths).to.equal(paths);
        });
    });

    DetailsWithDiff.VIEWS.forEach(function(item) {
      it(`should have attached to the ${item.name} button the onViewChange cb`,
        function() {
          props = getChildProps(component, 'selectViewButton', [item.name]);
          expect(props.onClick).to.equal(component.onViewChange);
        });
    });
  });
});
