import { Type } from '@nestjs/common';
import { rabbitmqCreateBus as createBus } from '@kerthin/bus';

import { IBusAdapter } from '../interfaces/bus/bus-adapter.interface';
import { ICommand } from '../interfaces/commands/command.interface';
import { ICommandDto } from '../interfaces/commands/command-dto-interface';
import { IEvent } from '../interfaces/events/event.interface';
import { IEventDto } from '../interfaces/events/event-dto.interface';
import { Handler } from '../types';
import { IEventHandler } from '../interfaces/events/event-handler.interface';
import { ICommandHandler } from '../interfaces/commands/command-handler.interface';
import { COMMAND_HANDLER_METADATA, EVENT_HANDLER_METADATA } from '../config/constants.config';

export class RabbitMQBusAdapter implements IBusAdapter {
  private bus: any;
  private handlers: Map<string, Handler> = new Map<string, Handler>();

  constructor(
    private readonly exchange: string,
    private readonly host: string,
    private readonly service: string
  ) { }

  setHandlers(handlers: Map<string, Handler>): this {
    this.handlers = handlers;
    return this;
  }

  async init(): Promise<void> {
    const exchange = this.exchange;
    const host = this.host;
    const service = this.service;

    this.bus = await createBus({ exchange, host, service });

    this.handlers.forEach(this.subscribers.bind(this));
  }

  publish(data: ICommand<ICommandDto> | IEvent<IEventDto>): any {
    const { action, context } = data;

    return this.bus.publish(action, data, context);
  }

  private subscribers(value: Handler, key: string): void {
    const { constructor } = Object.getPrototypeOf(value);
    const target = this.reflectName(constructor);
    const instance: any = new target();

    const handle = (msg, ack, nack) => {
      // TODO: this should be validate appropriately
      try {
        value.handle(JSON.parse(msg.content.toString()));
        ack();
      } catch (error) {
        ack();
      }
    };

    this.bus.subscribe(instance.action, handle, instance.context);
  }

  private reflectName(handler: Type<IEventHandler<IEvent<IEventDto>> | ICommandHandler<ICommand<ICommandDto>>>): FunctionConstructor {
    let target = Reflect.getMetadata(EVENT_HANDLER_METADATA, handler);

    if (!target) {
      target = Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
    }

    return target;
  }

}
