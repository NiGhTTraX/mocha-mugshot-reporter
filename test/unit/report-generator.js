var expect = require('chai').expect,
    generateReport = require('../../lib/report-generator.js'),
    fs = require('fs-extra'),
    path = require('path');

var rootDirectory = 'visual-report',
    staticsDirectory = 'statics',
    dataPath = path.join(rootDirectory, 'data.js'),
    expectedData = JSON.parse(fs.readFileSync(path.join(__dirname,
      './data/test-structure-data.js')));

/**
 * Removes a directory equal to rm -rf
 *
 * @param {String} directory
 * @parma {Function} done
 */
function cleanUp(directory, done) {
  fs.remove(directory, function(error) {
    if (error && error.code !== 'ENOENT') {
      throw error;
    }

    done();
  });
}

describe('Report generator', function() {

  afterEach(function(done) {
    cleanUp(rootDirectory, done);
  });

  it('should throw Error if no data is received', function() {
    expect(generateReport.bind(null)).to.throw(Error);
  });

  it('should throw Error if no callback is received', function() {
    expect(generateReport.bind(null, {})).to.throw(Error);
  });

  it('should create the rootDirectory', function(done) {
    generateReport({}, {}, function(error) {
      expect(error).to.be.null;

      var stats = fs.statSync(rootDirectory);
      expect(stats.isDirectory()).to.be.true;

      done();
    });
  });

  it('should create the rootDirectory passed as param', function(done) {
    var rootDirectory = 'root';

    generateReport({}, {rootDirectory: rootDirectory}, function(error) {
      expect(error).to.be.null;

      var stats = fs.statSync(rootDirectory);

      expect(stats.isDirectory()).to.be.true;

      cleanUp(rootDirectory, done);
    });
  });

  it('should create the data file', function(done) {
    generateReport({}, {}, function(error) {
      expect(error).to.be.null;

      var stats = fs.statSync(dataPath);

      expect(stats.isFile()).to.be.true;

      done();
    });
  });

  it('should contain the data of the test-structure fixture', function(done) {
    generateReport(expectedData, {}, function(error) {
      expect(error).to.be.null;

      fs.readFile(dataPath, 'utf8', function(error, data) {
        if (error) {
          throw error;
        }

        // Slice out the the var declaration and the end semicolon.
        data = data.slice(11, -1);

        expect(JSON.parse(data)).to.be.deep.equal(expectedData);

        done();
      });
    });
  });

  it('should copy the statics directory into the rootDirectory',
     function(done) {
    generateReport({}, {}, function(error) {
      expect(error).to.be.null;

      var copyStaticsDirectory = path.join(rootDirectory, staticsDirectory),
          stats = fs.statSync(copyStaticsDirectory);

      expect(stats.isDirectory()).to.be.true;

      fs.readdir(staticsDirectory, function(error, staticsFiles) {
        fs.readdir(copyStaticsDirectory, function(error, copyStaticsFiles) {

          for (var i = 0; i < copyStaticsFiles; i++) {
            expect(copyStaticsFiles[i]).to.be.equal(staticsFiles[i]);
          }
        });
      });

      done();
    });
  });
});
