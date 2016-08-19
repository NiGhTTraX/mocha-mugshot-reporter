import Results from '../../../../ui/components/results.jsx';
import fixture from '../../../fixtures/components/results/suites.js';
import {render, stubMethod} from '../../helpers.js';

describe('Results', function() {

  describe('Render', function() {
    let loadChildStub;

    beforeEach(function() {
      loadChildStub = stubMethod(Results, 'loadChild', null);
      render(Results, fixture);
    });

    it('should render the suite child', function() {
      expect(loadChildStub).to.have.been.calledWith('suite');
    });

    it('should render a Suite component for every suite', function() {
      expect(loadChildStub).to.have.callCount(fixture.suites.length - 1);
    });
  });
});
