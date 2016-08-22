import Report from '../../../../ui/components/report.jsx';
import fixture from '../../../fixtures/components/report/data.js';
import {render, stubMethod} from '../../helpers.js';

const FILTERS = ['passes', 'failures', 'all'];

describe('Report', function() {
  describe('Callbacks', function() {
    let component;

    beforeEach(function() {
      stubMethod(Report, 'render', null);
      component = render(Report, fixture);
    });

    FILTERS.forEach(function(item) {
      it(`should change the filter to ${item}`, function() {
        component.onFilterUpdate(item);
        expect(component.state.filter).to.equal(item);
      });
    });
  });
});
