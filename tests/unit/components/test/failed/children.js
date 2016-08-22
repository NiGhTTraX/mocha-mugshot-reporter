import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/test/failedTest.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Test', function() {
  describe('Children', function() {
    describe('Failed Test', function() {
      const {result, error} = fixture.test;
      let props, paths, component;

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

      it('should pass the diff path', function() {
        expect(paths.diff).to.equal(result.diff);
      });

      it('should pass the screenshot path', function() {
        expect(paths.screenshot).to.equal(result.screenshot);
      });

      it('should pass the error object', function() {
        expect(props.details.error).to.equal(error);
      });
    });
  });
});
