import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import FadeView from '../../../../../ui/components/views/fadeView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render} from '../../../helpers.js';

const RANDOM_VALUE = _.random(0, 1, true);

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
        component.refs.inputRange.value = RANDOM_VALUE;
        TestUtils.Simulate.change(component.refs.inputRange);

        expect(component.state.value).to.equal(RANDOM_VALUE);
      });
  });
});
