import FadeView from '../../../../../ui/components/views/fadeView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render} from '../../../helpers.js';

describe('FadeView', function() {

  describe('Render', function() {
    let component, imageDiffProps, inputRangeProps, paths;

    beforeEach(function() {
      component = render(FadeView, fixture);
      imageDiffProps = component.refs.imageDiff.props;
      inputRangeProps = component.refs.inputRange;
      paths = fixture.paths;
    });

    it('should render an ImageDiff component with the baseline and the ' +
      'screenshot', function() {
      expect(imageDiffProps.before).to.equal(paths.screenshot);
      expect(imageDiffProps.after).to.equal(paths.baseline);
    });

    it('should render the ImageDiff component with type \'fade\'', function() {
      expect(imageDiffProps.type).to.equal('fade');
    });

    it('should render the ImageDiff component with the initial value ' +
      `${FadeView.DEFAULT_VALUE}`, function() {
      expect(imageDiffProps.value).to.equal(FadeView.DEFAULT_VALUE);
    });

    it('should render an input range with the default value ' +
        `${FadeView.DEFAULT_VALUE}`, function() {
      expect(inputRangeProps.value).to.equal(`${FadeView.DEFAULT_VALUE}`);
    });

    it('should have attached on the inputRange the onValueChange cb',
      function() {
        expect(component.refs.inputRange.props.onChange)
          .to.equal(component.onValueChange);
      });
  });
});
