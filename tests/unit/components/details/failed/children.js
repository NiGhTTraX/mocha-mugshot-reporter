import Details from '../../../../../ui/components/details.jsx';
import fixture from '../../../../fixtures/components/details/details-failed.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Details', function() {
  describe('Children', function() {
    describe('Failed Test', function() {
      let component, props, expectedPaths, expectedError, childPaths;

      beforeEach(function() {
        expectedPaths = fixture.details.paths;
        expectedError = fixture.details.error;
        stubMethod(Details, 'render', null);
        component = render(Details, fixture);
        props = getChildProps(component,
            'failedTest', [expectedPaths, expectedError]);
        childPaths = props.paths;
      });

      it('should pass the visual regression status', function() {
        expect(childPaths.isEqual).to.equal(false);
      });

      it('should pass the baseline path', function() {
        expect(childPaths.baseline).to.equal(expectedPaths.baseline);
      });

      it('should pass the screenshot path', function() {
        expect(childPaths.screenshot).to.equal(expectedPaths.screenshot);
      });

      it('should pass the diff path', function() {
        expect(childPaths.diff).to.equal(expectedPaths.diff);
      });

      it('should pass an error object', function() {
        expect(props.error).to.equal(expectedError);
      });
    });
  });
});
