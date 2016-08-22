import Details from '../../../../../ui/components/details.jsx';
import fixture from '../../../../fixtures/components/details/details-failed.js';
import {render, stubMethod} from '../../../helpers.js';

describe('Details', function() {
  describe('Render', function() {
    describe('Failed Test', function() {
      let loadChildStub;

      beforeEach(function() {
        loadChildStub = stubMethod(Details, 'loadChild', null);
        render(Details, fixture);
      });

      it('should render the failedTest child', function() {
        const {paths, error} = fixture.details;
        expect(loadChildStub)
          .to.have.been.calledWith('failedTest', paths, error);
      });
    });
  });
});
