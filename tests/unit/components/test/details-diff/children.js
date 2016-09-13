import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/failed/details-diff.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Test', function() {
  describe('Children', function() {
    describe('Failed Test', function() {
      let props, paths, component, expectedPaths;

      beforeEach(function() {
        stubMethod(Test, 'render', null);
        component = render(Test, fixture);
        props = getChildProps(component, 'detailsWithDiff',
            [fixture.paths, fixture.error]);
        paths = props.paths;
        expectedPaths = fixture.paths;
      });

      it('should pass the baseline path', function() {
        expect(paths.baseline).to.equal(expectedPaths.baseline);
      });

      it('should pass the diff path', function() {
        expect(paths.diff).to.equal(expectedPaths.diff);
      });

      it('should pass the screenshot path', function() {
        expect(paths.screenshot).to.equal(expectedPaths.screenshot);
      });

      it('should pass the error object', function() {
        expect(props.error).to.equal(fixture.error);
      });
    });
  });
});
