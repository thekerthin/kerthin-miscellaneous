import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { Bus } from './bus';
import { IEventHandler } from './interfaces/events/event-handler.interface';
import { IEvent } from './interfaces/events/event.interface';
import { IEventDto } from './interfaces/events/event-dto.interface';
import { EVENT_HANDLER_METADATA } from './config';

@Injectable()
export class EventBus extends Bus {

  constructor(moduleRef: ModuleRef) {
    super(moduleRef);
  }

  publish(data: IEvent<IEventDto>): any {
    return this.adapter.publish(data);
  }

  register(handlers: Type<IEventHandler<IEvent<IEventDto>>>[]): void {
    handlers.forEach(this.registerHandler);
  }

  protected reflectName(handler: Type<IEventHandler<IEvent<IEventDto>>>): FunctionConstructor {
    return Reflect.getMetadata(EVENT_HANDLER_METADATA, handler);
  }

}
