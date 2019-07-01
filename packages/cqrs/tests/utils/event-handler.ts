import { EventHandler, IEventHandler } from '../../src';
import { TestEvent } from './event';

@EventHandler(TestEvent)
export class TestEventHandler implements IEventHandler<TestEvent> {

  handle(event: TestEvent): void { }

}
