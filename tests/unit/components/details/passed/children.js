import Details from '../../../../../ui/components/details.jsx';
import fixture from '../../../../fixtures/components/details/details-passed.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Details', function() {

  describe('Children', function() {

    describe('Passed Test', function() {
      let component, props, expectedPaths, childPaths;

      beforeEach(function() {
        expectedPaths = fixture.details.paths;
        stubMethod(Details, 'render', null);
        component = render(Details, fixture);
        props = getChildProps(component, 'passedTest', [expectedPaths]);
        childPaths = props.paths;
      });

      it('should pass the visual regression status', function() {
        expect(childPaths.isEqual).to.be.true;
      });

      it('should pass the baseline path', function() {
        expect(childPaths.baseline).to.equal(expectedPaths.baseline);
      });

      it('should not pass an error object', function() {
        expect(props.error).to.be.undefined;
      });
    });
  });
});
