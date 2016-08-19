import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/test/passedTest.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Test', function() {

  describe('Children', function() {

    describe('Passed Test', function() {
      const {result, error} = fixture.test;
      let component, props, paths;

      beforeEach(function() {
        const details = {
          paths: result,
          error: error
        };
        stubMethod(Test, 'render', null);
        component = render(Test, fixture);
        props = getChildProps(component, 'details', [details]);
        paths = props.details.paths;
      });

      it('should pass the baseline path', function() {
        expect(paths.baseline).to.equal(result.baseline);
      });

      it('should not pass a diff path', function() {
        expect(paths.diff).to.be.undefined;
      });

      it('should not pass a screenshot path', function() {
        expect(paths.screenshot).to.be.undefined;
      });

      it('should not pass an error object', function() {
        expect(props.details.error).to.be.undefined;
      });
    });
  });
});
