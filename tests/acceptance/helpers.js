import fs from 'fs-extra';

module.exports = {
  cleanUp: function(path, done) {
    fs.remove(path, function(error) {
      if (error && error.code !== 'ENOENT') {
        throw error;
      }
      done();
    });
  }
};
