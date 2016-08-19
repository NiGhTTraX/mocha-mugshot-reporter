import _ from 'lodash';

module.exports = {
  passes: _.random(0, 100),
  failures: _.random(0, 100),
  duration: _.random(0, 100, true),
  filter: 'all',
  updateFilter: function() { }
};
