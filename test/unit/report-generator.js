var expect = require('chai').expect,
    generateReport = require('../../lib/report-generator.js'),
    fs = require('fs-extra'),
    path = require('path');

var rootDirectory = 'visual-report',
    staticsDirectory = 'statics',
    dataPath = path.join(rootDirectory, 'data.js'),
    expectedData = require('./data/test-structure-data.js'),
    staticFiles = ['a.js', 'b.txt', 'c.php'];

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

/**
 * Creates a directory with files
 */
function createStatics() {

  fs.mkdirSync(staticsDirectory);

  staticFiles.forEach(function(file) {
    fs.createFileSync(path.join(staticsDirectory, file));
  });
}

describe('Report generator', function() {

  beforeEach(function(done) {
    createStatics();

    done();
  });

  afterEach(function(done) {
    cleanUp(rootDirectory, function() {
      cleanUp(staticsDirectory, done);
    });
  });

  it('should throw Error if no data is received', function() {
    expect(generateReport.bind(null)).to.throw(Error);
  });

  it('should throw Error if no callback is received', function() {
    expect(generateReport.bind(null, {})).to.throw(Error);
  });

  it('should set the options as callback if no options obj is received',
     function() {
    generateReport.bind(null, {}, function(error) {
      expect(error).to.be.null;
     });
  });

  it('should create the rootDirectory', function(done) {
    generateReport({}, function(error) {
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
    generateReport({}, function(error) {
      expect(error).to.be.null;

      var stats = fs.statSync(dataPath);

      expect(stats.isFile()).to.be.true;

      done();
    });
  });

  it('should contain the data of the test-structure fixture', function(done) {
    generateReport(expectedData, function(error) {
      expect(error).to.be.null;

      var expected = 'var data = ' + JSON.stringify(expectedData) + ';';

      fs.readFile(dataPath, 'utf8', function(error, data) {
        if (error) {
          throw error;
        }

        expect(data).to.be.equal(expected);

        done();
      });
    });
  });

  it('should copy the statics directory into the rootDirectory',
     function(done) {
    generateReport({}, function(error) {
      expect(error).to.be.null;

      var stats = fs.statSync(staticsDirectory);

      expect(stats.isDirectory()).to.be.true;

      staticFiles.forEach(function(file) {
        var filePath = path.join(staticsDirectory, file);

        expect(fs.statSync(filePath).isFile()).to.be.true;
      });

      done();
    });
  });
});
