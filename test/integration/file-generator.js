var expect = require('chai').expect,
    Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var testFixturePath = path.join(__dirname, '../fixtures/test-structure.js'),
    mugshotReporter = path.join(__dirname, '../../index.js'),
    rootDirectory = './visual-report',
    dataPath = path.join(rootDirectory, 'data.js'),
    expectedData = require('./data/test-structure-data.js'),
    mocha = new Mocha();

mocha.addFile(testFixturePath);

function runMocha(done) {
  var stdoutWrite = process.stdout.write;

  process.stdout.write = function() {};

  mocha.reporter(mugshotReporter).run(function() {
    process.stdout.write = stdoutWrite;
    done();
  });
}

describe('File generator', function() {

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

  it('should create the rootDirectory', function(done) {
    runMocha(function() {
      var stats = fs.statSync(rootDirectory);

      expect(stats.isDirectory()).to.be.true;

      done();
    });
  });

  it('should create a file named "data.js"', function(done) {
    runMocha(function() {
      var stats = fs.statSync(dataPath);

      expect(stats.isFile()).to.be.true;

      done();
    });
  });

  it('should contain the data of the test-structure fixture', function(done) {
    runMocha(function() {
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
