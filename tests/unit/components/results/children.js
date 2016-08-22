import Results from '../../../../ui/components/results.jsx';
import fixture from '../../../fixtures/components/results/suites.js';
import {render, stubMethod, getChildProps} from '../../helpers.js';

describe('Results', function() {
  describe('Children', function() {
    const filter = fixture.filter;
    let component, props;

    beforeEach(function() {
      stubMethod(Results, 'render', null);
      component = render(Results, fixture);
    });

    /* the first suite comes empty */
    fixture.suites.slice(1).forEach(function(suite, index) {
      describe(index, function() {
        beforeEach(function() {
          props = getChildProps(component, 'suite', [suite, filter, index]);
        });

        it(`should pass the suite with index ${index}`, function() {
          expect(props.suite).to.equal(suite);
        });

        it(`should pass the filter: '${filter}'`, function() {
          expect(props.filter).to.equal(filter);
        });

        it(`should pass the key: '${index}'`, function() {
          expect(props.key).to.equal(index);
        });
      });

    });
  });
});
