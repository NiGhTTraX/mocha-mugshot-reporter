import Test from '../../../../../ui/components/test.jsx';
import fixture from '../../../../fixtures/components/test/passedTest.js';
import {render, stubMethod} from '../../../helpers.js';

describe('Test', function() {

  describe('Render', function() {

    describe('Passing', function() {
      let component, loadChildStub;

      beforeEach(function() {
        loadChildStub = stubMethod(Test, 'loadChild', null);
      });

      beforeEach(function() {
        component = render(Test, fixture);
      });

      it('should render the details child', function() {
        expect(loadChildStub).to.have.been.calledWith('details');
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

      it('should display the passed state', function() {
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
