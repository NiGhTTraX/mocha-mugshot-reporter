import _ from 'lodash';
import DetailsWithDiff from '../../../../ui/components/details-diff.jsx';
import fixture from '../../../fixtures/components/failed/details-diff.js';
import {render, stubMethod} from '../../helpers.js';

describe('Failed', function() {
  describe('Render', function() {
    let component, loadChildStub;

    beforeEach(function() {
      loadChildStub = stubMethod(DetailsWithDiff, 'loadChild', null);
      component = render(DetailsWithDiff, fixture);
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
        _.find(DetailsWithDiff.VIEWS, {name: 'default'}).component;

      expect(loadChildStub)
          .to.have.been.calledWith('view', viewComponent, fixture.paths);
    });

    DetailsWithDiff.VIEWS.slice(1).forEach(function(item) {
      it(`should render the ${item.name} view child`,
        function() {
          component.onViewChange({target: {name: item.name}});
          expect(loadChildStub)
              .to.have.been.calledWith('view', item.component, fixture.paths);
        });
    });

    DetailsWithDiff.VIEWS.forEach(function(item) {
      it(`should render the selectViewButton child to select ${item.name} view`,
        function() {
          expect(loadChildStub)
              .to.have.been.calledWith('selectViewButton', item.name);
        });
    });
  });
});
