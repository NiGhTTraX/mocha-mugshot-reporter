import Details from '../../../../../ui/components/details.jsx';
import fixture from '../../../../fixtures/components/details/details-passed.js';
import {render, stubMethod} from '../../../helpers.js';

describe('Details', function() {
  describe('Render', function() {
    describe('Passed Test', function() {
      let loadChildStub;

      beforeEach(function() {
        loadChildStub = stubMethod(Details, 'loadChild', null);
        render(Details, fixture);
      });

      it('should render the passedTest child', function() {
        expect(loadChildStub)
            .to.have.been.calledWith('passedTest', fixture.details.paths);
      });
    });
  });
});
