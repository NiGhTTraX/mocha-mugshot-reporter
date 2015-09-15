var fs = require('fs'),
    path = require('path');
/**
 * The directory of the visual report
 *
 * @type {String}
 * @const
 * @default
 */
var rootDirectory = 'visual-report';

/**
 * The path of the data file
 *
 * @type {String}
 * @const
 * @default
 */
var dataPath = 'data.js';

module.exports = function(data, done) {
  var output = 'var data = ' + JSON.stringify(data) + ';';

  try {
    fs.mkdirSync(rootDirectory);
  } catch(error) {
    if (error.code !== 'EEXIST') {
      return done(error);
    }
  }

  fs.writeFile(path.join(rootDirectory, dataPath), output, function(error) {
    if (error) {
      return done(error);
    }

    done();
  });
}
