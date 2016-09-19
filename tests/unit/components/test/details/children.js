import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/passed/details.js';
import {render, stubMethod, getChildProps} from '../../../helpers.js';

describe('Test', function() {
  describe('Children', function() {
    describe('Passed Test without diffs', function() {
      let component, props, paths;

      beforeEach(function() {
        stubMethod(Test, 'render', null);
        component = render(Test, fixture);
        props = getChildProps(component, 'details', [fixture.paths]);
        paths = props.paths;
      });

      it('should pass the baseline path', function() {
        expect(paths.baseline).to.equal(fixture.paths.baseline);
      });

      it('should not pass a diff path', function() {
        expect(paths.diff).to.be.undefined;
      });

      it('should not pass a screenshot path', function() {
        expect(paths.screenshot).to.be.undefined;
      });

      it('should not pass an error object', function() {
        expect(props.error).to.be.undefined;
      });
    });
  });
});
