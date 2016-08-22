import _ from 'lodash';
import SwipeView from '../../../../../ui/components/views/swipeView.jsx';
import fixture from '../../../../fixtures/components/views/paths.js';
import {render, stubMethod} from '../../../helpers.js';

describe('SwipeView', function() {
  describe('Callbacks', function() {
    let component;

    beforeEach(function() {
      stubMethod(SwipeView, 'render', null);
      component = render(SwipeView, fixture);
    });

    it('should change the value when the onValueChange cb is called',
      function() {
        const randomValue = _.random(0, 1, true);
        component.onValueChange({target: {value: randomValue}});
        expect(component.state.value).to.equal(randomValue);
      });
  });
});
