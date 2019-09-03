import * as chai from 'chai';
import * as _crypto from './crypto';

const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY';

describe('crypto', () => {

  it('encrypt', () => {
    const _encrypt = _crypto.encrypt(password);
    const result = _encrypt('I am a password');
    chai.expect(result).to.be.equal('e5c3ad13867521cdc373f723cf80c7');
  });

  it('decrypt', () => {
    const _decrypt = _crypto.decrypt(password);
    const result = _decrypt('e5c3ad13867521cdc373f723cf80c7');
    chai.expect(result).to.be.equal('I am a password');
  });

});
