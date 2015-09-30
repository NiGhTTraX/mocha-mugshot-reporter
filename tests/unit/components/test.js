var sd = require('skin-deep'),
    expect = require('chai').expect,
    Test = require('../../../ui/components/test.jsx'),
    fixture = require('../../fixtures/components/test.js');

describe('Test', function() {
  var tree, passTest, failTest;

  before(function() {
    passTest = fixture[0];
    failTest = fixture[1];
  });

  beforeEach(function() {
    tree = sd.shallowRender(<Test test={passTest}/>);
  });

  it('should display the test title', function() {
    expect(tree.textIn('.test-title')).to.contain(passTest.title);
  });

  it('should display the pass state', function() {
    expect(tree.textIn('.test-state')).to.be.equal(passTest.state);
  });

  it('should display the fail state', function() {
    tree = sd.shallowRender(<Test test={failTest}/>);

    expect(tree.textIn('.test-state')).to.be.equal(failTest.state);
  });

  it('should render the Details component', function() {
    expect(tree.findNode('Details')).to.not.be.false;
  });

  it('should not have initially the toggle class', function() {
    expect(tree.findNode('.test').props.className).to.not.
      contain(Test.DETAILS_TOGGLE_CLASS);
  });

  it('should have attached on the title the displayDetails cb', function() {
    var title, instance;

    title = tree.findNode('.test-title');
    instance = tree.getMountedInstance();

    expect(title.props.onClick).to.be.deep.equal(instance.displayDetails);
  });
});
