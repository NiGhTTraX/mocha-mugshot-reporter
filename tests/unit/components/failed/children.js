import FailedTest from '../../../../ui/components/failed.jsx';
import fixture from '../../../fixtures/components/failed/failed.js';
import {render, stubMethod, getChildProps} from '../../helpers.js';

describe('Failed', function() {
  describe('Children', function() {
    const paths = fixture.paths;
    let props, component;

    beforeEach(function() {
      stubMethod(FailedTest, 'render', null);
      component = render(FailedTest, fixture);
    });

    FailedTest.VIEWS.forEach(function(item) {
      it(`should pass the paths to the ${item} view child`,
        function() {
          props = getChildProps(component, item, [paths]);
          expect(props.paths).to.equal(paths);
        });
    });

    FailedTest.VIEWS.forEach(function(item) {
      it(`should have attached to the ${item} button the onViewChange cb`,
        function() {
          props = getChildProps(component, 'selectViewButton', [item]);
          expect(props.onClick).to.equal(component.onViewChange);
        });
    });
  });
});
