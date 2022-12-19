const INVALID_CPF = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

const INVALID_RG = [
  '000000000',
  '111111111',
  '222222222',
  '333333333',
  '444444444',
  '555555555',
  '666666666',
  '777777777',
  '888888888',
  '999999999',
];

/**
 * Validates a CPF number
 * https://www.geradorcpf.com/algoritmo_do_cpf.htm
 *
 * @param {String} cpf
 * @returns {Boolean}
 */
const cpf = (cpf) => {
  const numeric = String(cpf).replace(/[^\d]+/g,'');

  if (!numeric || numeric.length !== 11 || INVALID_CPF.includes(numeric)) {
    return false;
  }

  // first validator digit
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += parseInt(numeric[i], 10) * (10 - i);
  }

  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(numeric[9], 10)) {
    return false;
  }

  // second validator digit
  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += parseInt(numeric[i], 10) * (11 - i);
  }

  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(numeric[10], 10)) {
    return false;
  }

  return true;
};

/**
 * Validates a RG number
 *
 * @param {String} rg
 * @returns {Boolean}
 */
const rg = (rg) => {
  const numeric = String(rg).replace(/[^\d]+/g,'');

  if (!numeric || numeric.length !== 9 || INVALID_RG.includes(numeric)) {
    return false;
  }

  let sum = parseInt(numeric[8], 10) * 100;

  for (let i = 0; i < 8; i += 1) {
    sum += parseInt(numeric[i], 10) * (2 + i);
  }

  return sum % 11 === 0;
};

module.exports = {
  cpf, rg,
};
