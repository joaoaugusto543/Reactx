const { expect } = require('chai');
const Validator = require('./index');

describe('CPF validator', () => {
  it('Should validate CPF properly', () => {
    expect(Validator.cpf('725.701.128-10')).equal(true);
    expect(Validator.cpf('72570112810')).equal(true);
    expect(Validator.cpf(72570112810)).equal(true);
    expect(Validator.cpf('114.425.576-72')).equal(true);
    expect(Validator.cpf('582.574.187-90')).equal(true);
    expect(Validator.cpf('489.133.272-79')).equal(true);
    expect(Validator.cpf('268.756.219-08')).equal(true);
    expect(Validator.cpf('640.719.313-37')).equal(true);
    expect(Validator.cpf('015.080.689-25')).equal(true);

    expect(Validator.cpf('asd')).equal(false);
    expect(Validator.cpf('11122')).equal(false);
    expect(Validator.cpf('725.701.128')).equal(false);
    expect(Validator.cpf('111.111.222-10')).equal(false);
    expect(Validator.cpf('999.999.999-99')).equal(false);
    expect(Validator.cpf('114.425.576-99')).equal(false);
    expect(Validator.cpf('114.321.576-72')).equal(false);
  });
});

describe('RG validator', () => {
  it('Should validate RG properly', () => {
    expect(Validator.rg('91122534-1')).equal(true);
    expect(Validator.rg('91.122.534-1')).equal(true);
    expect(Validator.rg('16.598.018-7')).equal(true);
    expect(Validator.rg('33.862.701.7')).equal(true);
    expect(Validator.rg('27-1-1178-13')).equal(true);
    expect(Validator.rg(165980187)).equal(true);
    expect(Validator.rg('46746----6269')).equal(true);


    expect(Validator.rg('91122534')).equal(false);
    expect(Validator.rg('abc')).equal(false);
    expect(Validator.rg('16.98.018-7')).equal(false);
    expect(Validator.rg('33.862.701.77')).equal(false);
    expect(Validator.rg('27-1-1178-88')).equal(false);
  });
});
