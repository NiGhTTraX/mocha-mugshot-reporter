import Report from '../../../../ui/components/report.jsx';
import fixture from '../../../fixtures/components/report/data.js';
import suitesParser from './setup.js';
import {render, stubMethod} from '../../helpers.js';

describe('Report', function() {
  describe('Render', function() {
    const {
      suites,
      numberOfPasses,
      numberOfFailures,
      duration
    } = suitesParser(fixture.data);
    let loadChildStub;

    beforeEach(function() {
      loadChildStub = stubMethod(Report, 'loadChild', null);
      render(Report, fixture);
    });

    it('should render the header child', function() {
      expect(loadChildStub).to.have.been
          .calledWith('header', numberOfPasses, numberOfFailures, duration);
    });

    it('should render the results child', function() {
      expect(loadChildStub).to.have.been.calledWith('results', suites);
    });
  });
});
