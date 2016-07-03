var Person = require('../app/person');
var chai = require('chai');

describe('test', function(){
  var expect = chai.expect;

  it('person name', function(){
    var akira = new Person('akira');

    expect(akira.name).to.equal('akira');
  });

  it('greeting', function(){
    var akira = new Person('akira');

    akira.greeting();
  });
});
