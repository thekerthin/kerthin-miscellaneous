import { Test } from '@nestjs/testing';
import * as chai from 'chai';
import * as sinon from 'sinon';

import { CqrsModule, EventBus, LocalBusAdapter } from '../../src';
import { TestEventHandler } from '../utils/event-handler';
import { TestEvent } from '../utils/event';

describe('event bus', () => {

  let _module;
  let eventBus: EventBus;

  before(async () => {
    _module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [TestEventHandler],
    }).compile();

    await _module
      .get(CqrsModule)
      .onModuleInit();

    eventBus = _module.get(EventBus);

    await eventBus
      .setAdapter(new LocalBusAdapter())
      .init();
  });

  // it('should register event handlers', () => { });

  // it('should set an adapter', () => { });

  // it('should init event bus', () => { });

  it('should publish an event', () => {
    const testEventData: TestEvent = new TestEvent({ id: '12345', name: 'Test' });
    const testEventHandler = _module.get(TestEventHandler);

    sinon.stub(testEventHandler, 'handle')
      .callsFake(event => chai.expect(event).to.be.equals(testEventData));

    eventBus.publish(testEventData);
  });

});
