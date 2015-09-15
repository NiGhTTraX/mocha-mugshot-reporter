var expect = require('chai').expect,
    generateReport = require('../../lib/report-generator.js'),
    fs = require('fs'),
    path = require('path');

var rootDirectory = './visual-report',
    dataPath = path.join(rootDirectory, 'data.js'),
    expectedData = require('./data/test-structure-data.js');

describe('Report generator', function() {

  afterEach(function() {
    try {
      fs.unlinkSync(dataPath);
    } catch(error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    try {
      fs.rmdirSync(rootDirectory);
    } catch(error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  });

  it('should throw Error if no data is received', function() {
    expect(generateReport.bind(null)).to.throw(Error);
  });

  it('should throw Error if no callback is received', function() {
    expect(generateReport.bind(null, {})).to.throw(Error);
  });

  it('should create the rootDirectory', function(done) {
    generateReport({}, function(error) {
      expect(error).to.be.undefined;

      var stats = fs.statSync(rootDirectory);

      expect(stats.isDirectory()).to.be.true;

      done();
    });
  });

  it('should create a file named "data.js"', function(done) {
    generateReport({}, function(error) {
      expect(error).to.be.undefined;

      var stats = fs.statSync(dataPath);

      expect(stats.isFile()).to.be.true;

      done();
    });
  });

  it('should contain the data of the test-structure fixture', function(done) {
    generateReport(expectedData, function(error) {
      expect(error).to.be.undefined;

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
});
