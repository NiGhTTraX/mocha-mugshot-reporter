var sd = require('skin-deep'),
    expect = require('chai').expect,
    Details = require('../../../ui/components/details.jsx'),
    fixture = require('../../fixtures/components/details.js');

describe('Details', function() {
  var tree, passPaths, failPaths;

  before(function() {
    passPaths = fixture[0];
    failPaths = fixture[1];
  });

  it('should render the baseline', function() {
    tree = sd.shallowRender(<Details paths={passPaths}/>);

    expect(tree.findNode('.baseline')).to.not.be.false;
  });

  it('should render the diff if there is one', function() {
    tree = sd.shallowRender(<Details paths={failPaths}/>);

    expect(tree.findNode('.diff')).to.not.be.false;
  });

  it('should not render the diff if there is none', function() {
    tree = sd.shallowRender(<Details paths={passPaths}/>);

    expect(tree.findNode('.diff')).to.be.false;
  });

  it('should render the screenshot if there is one', function() {
    tree = sd.shallowRender(<Details paths={failPaths}/>);

    expect(tree.findNode('.screenshot')).to.not.be.false;
  });

  it('should not render the screenshot if there is none', function() {
    tree = sd.shallowRender(<Details paths={passPaths}/>);

    expect(tree.findNode('.screenshot')).to.be.false;
  });

  it('should have the correct baseline path', function() {
    tree = sd.shallowRender(<Details paths={failPaths}/>);

    expect(tree.findNode('.baseline').props.src).to.be.
      equal(failPaths.baseline);
  });

  it('should have the correct screenshot path', function() {
    tree = sd.shallowRender(<Details paths={failPaths}/>);

    expect(tree.findNode('.screenshot').props.src).to.be.
      equal(failPaths.screenshot);
  });

  it('should have the correct diff path', function() {
    tree = sd.shallowRender(<Details paths={failPaths}/>);

    expect(tree.findNode('.diff').props.src).to.be.equal(failPaths.diff);
  });
});
