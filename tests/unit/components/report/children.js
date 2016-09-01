import Report from '../../../../ui/components/report.jsx';
import fixture from '../../../fixtures/components/report/data.js';
import suitesParser from './setup.js';
import {render, stubMethod, getChildProps} from '../../helpers.js';

describe('Report', function() {
  describe('Children', function() {
    const {
      suites,
      numberOfPasses,
      numberOfFailures,
      duration
    } = suitesParser(fixture.data);
    let component, props;

    beforeEach(function() {
      stubMethod(Report, 'render', null);
      component = render(Report, fixture);
    });

    describe('Header', function() {
      beforeEach(function() {
        props = getChildProps(component, 'header',
          [numberOfPasses, numberOfFailures, duration]);
      });

      it('should pass the number of passes', function() {
        expect(props.passes).to.equal(numberOfPasses);
      });

      it('should pass the number of failures', function() {
        expect(props.failures).to.equal(numberOfFailures);
      });

      it('should pass the total duration', function() {
        expect(props.duration).to.equal(duration);
      });

      it('should pass the default filter', function() {
        expect(props.filter).to.equal('all');
      });
    });

    describe('Results', function() {
      beforeEach(function() {
        props = getChildProps(component, 'results', [suites]);
      });

      it('should pass the suites array', function() {
        expect(props.suites).to.equal(suites);
      });

      it('should pass the default filter', function() {
        expect(props.filter).to.equal('all');
      });
    });
  });
});
