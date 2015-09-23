var expect = require('chai').expect,
    generateReport = require('../../lib/report-generator.js'),
    fs = require('fs-extra'),
    path = require('path');

var rootDirectory = 'visual-report',
    staticsDirectory = 'statics',
    dataPath = path.join(rootDirectory, 'data.js'),
    expectedData = JSON.parse(fs.readFileSync(path.join(__dirname,
      './data/test-structure-data.json')));

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

        var frontSlice = 'var '.length + generateReport._mochaTestData.length +
              ' = '.length,
            backSlice = ';'.length;

        // Slice out the the var declaration and the end semicolon.
        data = data.slice(frontSlice, -backSlice);

        expect(JSON.parse(data)).to.be.deep.equal(expectedData);

        done();
      });
    });
  });

  it('should copy the statics directory into the rootDirectory',
     function(done) {
    generateReport({}, {}, function(error) {
      expect(error).to.be.null;

      var staticsDirectoryCopy = path.join(rootDirectory, staticsDirectory),
          stats = fs.statSync(staticsDirectoryCopy);

      expect(stats.isDirectory()).to.be.true;

      fs.readdir(staticsDirectory, function(error, staticsFiles) {
        fs.readdir(staticsDirectoryCopy, function(error, staticsFilesCopy) {

          for (var i = 0; i < staticsFilesCopy; i++) {
            expect(staticsFilesCopy[i]).to.be.equal(staticsFiles[i]);
          }
        });
      });

      done();
    });
  });
});
