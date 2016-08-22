import FailedTest from '../../../../ui/components/failed.jsx';
import fixture from '../../../fixtures/components/failed/failed.js';
import {render, stubMethod} from '../../helpers.js';

describe('Failed', function() {
  describe('Render', function() {
    let component, loadChildStub;

    beforeEach(function() {
      loadChildStub = stubMethod(FailedTest, 'loadChild', null);
      component = render(FailedTest, fixture);
    });

    it('should render the button which toggles the error message', function() {
      expect(component.refs.errorButton).to.not.be.undefined;
    });

    it('should have attached on the error button the onErrorMessageOpen cb',
      function() {
        expect(component.refs.errorButton.props.onClick)
            .to.equal(component.onErrorMessageOpen);
      });

    it('should initially render the default view child', function() {
      expect(loadChildStub).to.have.been.calledWith('default', fixture.paths);
    });

    FailedTest.VIEWS.slice(1).forEach(function(item) {
      it(`should render the ${item} view child`,
        function() {
          component.onViewChange({target: {name: item}});
          expect(loadChildStub).to.have.been.calledWith(item, fixture.paths);
        });
    });

    FailedTest.VIEWS.forEach(function(item) {
      it(`should render selectViewButton child to select the ${item} view`,
        function() {
          expect(loadChildStub)
              .to.have.been.calledWith('selectViewButton', item);
        });
    });
  });
});
