import _ from 'lodash';
import FadeView from '../../../../../ui/components/views/fadeView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render, stubMethod} from '../../../helpers.js';

describe('FadeView', function() {
  describe('Callbacks', function() {
    let component;

    beforeEach(function() {
      stubMethod(FadeView, 'render', null);
      component = render(FadeView, fixture);
    });

    it('should change the value when the onValueChange cb is called',
      function() {
        const randomValue = _.random(0, 1, true);
        component.onValueChange({target: {value: randomValue}});
        expect(component.state.value).to.equal(randomValue);
      });
  });
});
