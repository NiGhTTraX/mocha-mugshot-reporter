import Suite from '../../../../ui/components/suite.jsx';
import fixture from '../../../fixtures/components/suite/suite.js';
import {render, stubMethod, getChildProps} from '../../helpers.js';

describe('Suite', function() {

  describe('Children', function() {
    let component, props;

    beforeEach(function() {
      stubMethod(Suite, 'render', null);
      component = render(Suite, fixture);
    });

    fixture.suite.tests.forEach(function(test, index) {
      describe(index, function() {
        beforeEach(function() {
          props = getChildProps(component, 'test', [test, index]);
        });

        it(`should pass the test with index ${index}`, function() {
          expect(props.test).to.equal(test);
        });

        it(`should pass the key: '${index}'`, function() {
          expect(props.key).to.equal(index);
        });
      });
    });
  });
});
