import Test from '../../../../../../../ui/components/test.jsx';
import fixture from '../../../../../../fixtures/components/failed/details-without-paths.js';
import {render, stubMethod, getChildProps} from '../../../../../helpers.js';

describe('Test', function() {
  describe('Children', function() {
    describe('Failed Test unexpected', function() {
      let props, component;

      beforeEach(function() {
        stubMethod(Test, 'render', null);
        component = render(Test, fixture);
        props = getChildProps(component, 'detailsWithDiff',
            [fixture.paths, fixture.error]);
      });

      it('should have undefined paths', function() {
        expect(props.paths).to.be.undefined;
      });

      it('should pass the error object', function() {
        expect(props.error).to.equal(fixture.error);
      });
    });
  });
});
