// import * as sinon from 'sinon';
// import * as chai from 'chai';

// import { LogLevel, Logger as NestLogger } from '@nestjs/common';
// import { Logger } from './logger';
// import { Strategy } from './interfaces/strategy.interface';

// describe('logger', () => {

//   let nestLoggerLog;

//   class TestStrategy implements Strategy {
//     constructor(
//       public readonly level: LogLevel = 'log',
//       public readonly runBehaviorByDefault: boolean = true
//     ) { }
//     execute(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean): void { }
//   }

//   beforeEach(() => {
//     nestLoggerLog = sinon.stub(NestLogger, 'log');
//   });

//   afterEach(() => {
//     nestLoggerLog.restore();
//   });

//   it('should run both the strategy and the default log', () => {
//     const strategy = new TestStrategy('log', true);
//     sinon.stub(strategy, 'execute');

//     Logger.setStrategy([strategy]);
//     Logger.log('my test should run');

//     chai.expect(strategy.execute).to.have.been.called;
//     chai.expect(NestLogger.log).to.have.been.called;
//   });

//   it('should run only the strategy NOT the default log', () => {
//     const strategy = new TestStrategy('log', false);
//     sinon.stub(strategy, 'execute');

//     Logger.setStrategy([strategy]);
//     Logger.log('my test should run');

//     chai.expect(strategy.execute).to.have.been.called;
//     chai.expect(nestLoggerLog.callCount).to.have.equal(0);
//   });

// });
