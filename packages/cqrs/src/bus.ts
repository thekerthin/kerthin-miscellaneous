import { ModuleRef } from '@nestjs/core';

import { Handler, TypeHandler } from './types';
import { ICommand } from './interfaces/commands/command.interface';
import { IEvent } from './interfaces/events/event.interface';
import { ICommandDto } from './interfaces/commands/command-dto-interface';
import { IEventDto } from './interfaces/events/event-dto.interface';
import { IBusAdapter } from './interfaces/bus/bus-adapter.interface';

// TODO: implement adapter steps
export abstract class Bus {

  protected handlers = new Map<string, Handler>();

  protected adapter: IBusAdapter;

  constructor(protected readonly moduleRef: ModuleRef) { }

  abstract publish(data: ICommand<ICommandDto> | IEvent<IEventDto>): any;

  abstract register(handlers: TypeHandler[]): void;

  protected abstract reflectName(handler: TypeHandler): FunctionConstructor;

  setAdapter(adapter: IBusAdapter): this {
    this.adapter = adapter;
    this.adapter.setHandlers(this.handlers);
    return this;
  }

  init(): Promise<void> | void {
    return this.adapter.init();
  }

  protected registerHandler = (handler: TypeHandler): void => {
    // tslint:disable-next-line:no-console
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }

    const target = this.reflectName(handler);
    if (!target) {
      // throw new InvalidCommandHandlerException();
      throw new Error();
    }

    this.bind(target.name, instance);
  };

  private bind(name: string, handler: Handler): void {
    this.handlers.set(name, handler);
  }

}
