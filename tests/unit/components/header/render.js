import Header from '../../../../ui/components/header.jsx';
import fixture from '../../../fixtures/components/header/header.js';
import {render} from '../../helpers.js';

const MENU_ITEMS = ['all', 'passes', 'failures'];

describe('Header', function() {
  describe('Render', function() {
    const {passes, failures} = fixture,
          all = passes + failures;
    let component;

    beforeEach(function() {
      sandbox.stub(fixture, 'updateFilter');
      component = render(Header, fixture);
    });

    it('should display the total tests number', function() {
      expect(component.refs.allBadge.props.children)
          .to.equal(`${all}`);
    });

    it('should display the passes number', function() {
      expect(component.refs.passesBadge.props.children)
          .to.equal(`${passes}`);
    });

    it('should display the failures number', function() {
      expect(component.refs.failuresBadge.props.children)
          .to.equal(`${failures}`);
    });

    it('should display the total duration', function() {
      expect(component.refs.durationBadge.props.children)
          .to.equal(`${fixture.duration} ms`);
    });

    MENU_ITEMS.forEach(function(item) {
      it(`should have attached on the nav item ${item}, the onFilterChange cb`,
        function() {
          component.refs[item].props.onClick();
          expect(fixture.updateFilter).to.have.been.calledWith(item);
        });
    });
  });
});
