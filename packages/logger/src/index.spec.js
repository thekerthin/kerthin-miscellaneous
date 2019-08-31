require('ts-node/register');

const chai = require('chai');
// .use(require('chai-as-promised'));

chai.use(require('sinon-chai'));

// Chai
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should;

should();