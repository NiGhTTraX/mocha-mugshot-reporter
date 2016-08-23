import _ from 'lodash';

export default {
  passes: _.random(0, 100),
  failures: _.random(0, 100),
  duration: _.random(0, 100, true),
  filter: 'all',
  updateFilter: function() { }
};
