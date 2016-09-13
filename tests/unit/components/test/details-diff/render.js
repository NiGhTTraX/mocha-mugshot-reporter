import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/test/failedTest.js';
import {render, stubMethod} from '../../../helpers.js';

describe('Test', function() {
  describe('Render', function() {
    describe('Failing', function() {
      let component, loadChildStub;

      beforeEach(function() {
        loadChildStub = stubMethod(Test, 'loadChild', null);
        component = render(Test, fixture);
      });

      it('should render the detailsWithDiff child', function() {
        expect(loadChildStub).to.have.been.calledWith('detailsWithDiff');
      });

      it('should render the test title', function() {
        expect(component.refs.testTitle.textContent)
            .to.contain(fixture.test.title);
      });

      it('should have attached on the title the onDisplayDetails cb',
        function() {
          expect(component.refs.testTitle.onClick)
              .to.equal(component.displayDetails);
        });

      it('should display the failed state', function() {
        expect(component.refs.testState.textContent)
            .to.contain(fixture.test.state);
      });

      it('should display the test duration', function() {
        expect(component.refs.testDuration.textContent)
            .to.contain(fixture.test.duration);
      });
    });
  });
});
