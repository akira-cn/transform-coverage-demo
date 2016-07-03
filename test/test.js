describe('tests', function(){
  var chai = require('chai');
  var expect = chai.expect;

  describe('person.js', function(){
    var Person = require('../app/person');
    
    it('person name', function(){
      var akira = new Person('akira');

      expect(akira.name).to.equal('akira');
    });

    it('greeting', function(){
      var akira = new Person('akira');

      expect(akira.greeting()).to.equal('hello akira');
    });
  });
  describe('leftpad.js', function(){
    var leftpad = require('../app/leftpad.js');
  });
});
