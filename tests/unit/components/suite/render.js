import Suite from '../../../../ui/components/suite.jsx';
import fixture from '../../../fixtures/components/suite/suite.js';
import {render, stubMethod} from '../../helpers.js';

describe('Suite', function() {

  describe('Render', function() {
    let component, loadChildStub;

    beforeEach(function() {
      loadChildStub = stubMethod(Suite, 'loadChild', null);
      component = render(Suite, fixture);
    });

    it('should render the test child', function() {
      expect(loadChildStub).to.have.been.calledWith('test');
    });

    it('should render a Test component for every test', function() {
      expect(loadChildStub).to.have.callCount(fixture.suite.tests.length);
    });

    it('should render the suite title', function() {
      expect(component.refs.suiteTitle.innerHTML).to.equal(fixture.suite.title);
    });

    it('should indent the suite properly', function() {
      const expected = Suite.MARGIN_LEFT * (fixture.suite.indent - 1);

      expect(component.refs.suite.style.marginLeft).to.equal(`${expected}px`);
    });

    it('should set the suite title fontSize correctly', function() {
      const expected = Suite.FONT_SIZE / fixture.suite.indent + '%';

      expect(component.refs.suiteTitle.style.fontSize).to.equal(`${expected}`);
    });
  });
});
