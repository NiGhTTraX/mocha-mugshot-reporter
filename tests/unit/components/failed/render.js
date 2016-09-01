import _ from 'lodash';
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
      const viewComponent =
        _.find(FailedTest.VIEWS, {name: 'default'}).component;

      expect(loadChildStub)
          .to.have.been.calledWith('view', viewComponent, fixture.paths);
    });

    FailedTest.VIEWS.slice(1).forEach(function(item) {
      it(`should render the ${item.name} view child`,
        function() {
          component.onViewChange({target: {name: item.name}});
          expect(loadChildStub)
              .to.have.been.calledWith('view', item.component, fixture.paths);
        });
    });

    FailedTest.VIEWS.forEach(function(item) {
      it(`should render the selectViewButton child to select ${item.name} view`,
        function() {
          expect(loadChildStub)
              .to.have.been.calledWith('selectViewButton', item.name);
        });
    });
  });
});
