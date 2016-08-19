import SwipeView from '../../../../../ui/components/views/swipeView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render} from '../../../helpers.js';

describe('SwipeView', function() {

  describe('Render', function() {
    let component, imageDiffProps, inputRangeProps, paths;

    beforeEach(function() {
      component = render(SwipeView, fixture);
      imageDiffProps = component.refs.imageDiff.props;
      inputRangeProps = component.refs.inputRange;
      paths = fixture.paths;
    });

    it('should render an ImageDiff component with the baseline and the' +
      ' screenshot', function() {
      expect(imageDiffProps.before).to.equal(paths.screenshot);
      expect(imageDiffProps.after).to.equal(paths.baseline);
    });

    it('should render the ImageDiff component with type \'swipe\'', function() {
      expect(imageDiffProps.type).to.equal('swipe');
    });

    it('should render the ImageDiff component with the initial value ' +
      `${SwipeView.DEFAULT_VALUE}`, function() {
      expect(imageDiffProps.value).to.equal(SwipeView.DEFAULT_VALUE);
    });

    it('should render an input range with the default value ' +
      `${SwipeView.DEFAULT_VALUE}`, function() {
      expect(inputRangeProps.value).to.equal(`${SwipeView.DEFAULT_VALUE}`);
    });

    it('should have attached on the inputRange the onValueChange cb',
      function() {
        expect(component.refs.inputRange.props.onChange)
          .to.equal(component.onValueChange);
      });
  });
});
