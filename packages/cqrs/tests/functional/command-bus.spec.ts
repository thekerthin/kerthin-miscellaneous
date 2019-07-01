import { Test } from '@nestjs/testing';
import * as chai from 'chai';
import * as sinon from 'sinon';

import { CqrsModule, CommandBus, LocalBusAdapter } from '../../src';
import { TestCommandHandler } from '../utils/command-handler';
import { TestCommand } from '../utils/command';

describe('command bus', () => {

  let _module;
  let commandBus: CommandBus;

  before(async () => {
    _module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [TestCommandHandler],
    }).compile();

    await _module
      .get(CqrsModule)
      .onModuleInit();

    commandBus = _module.get(CommandBus);

    await commandBus
      .setAdapter(new LocalBusAdapter())
      .init();
  });

  // it('should register command handlers', () => {
  //   const commandBus = _module.get(CommandBus);
  //   console.log('commandBus', commandBus);
  // });

  // it('should set an adapter', () => { });

  // it('should init command bus', () => { });

  it('should publish a command', () => {
    const testCommandData: TestCommand = new TestCommand({ id: '12345', name: 'Test' });
    const testCommandHandler = _module.get(TestCommandHandler);

    sinon.stub(testCommandHandler, 'handle')
      .callsFake(command => chai.expect(command).to.be.equals(testCommandData));

    commandBus.publish(testCommandData);
  });

});
