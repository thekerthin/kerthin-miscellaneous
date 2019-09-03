const _crypto = require('crypto');
const algorithm = 'aes-256-gcm';

export const encrypt = (password) => (text) => {
  const cipher = _crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (password) => (text) => {
  const decipher = _crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  // dec += decipher.final('utf8');
  return dec;
};
