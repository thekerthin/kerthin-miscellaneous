import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { Bus } from './bus';
import { ICommandHandler } from './interfaces/commands/command-handler.interface';
import { ICommand } from './interfaces/commands/command.interface';
import { ICommandDto } from './interfaces/commands/command-dto-interface';
import { COMMAND_HANDLER_METADATA } from './config';

@Injectable()
export class CommandBus extends Bus {

  constructor(moduleRef: ModuleRef) {
    super(moduleRef);
  }

  publish(data: ICommand<ICommandDto>): any {
    return this.adapter.publish(data);
  }

  register(handlers: Type<ICommandHandler<ICommand<ICommandDto>>>[]): void {
    handlers.forEach(this.registerHandler);
  }

  protected reflectName(handler: Type<ICommandHandler<ICommand<ICommandDto>>>): FunctionConstructor {
    return Reflect.getMetadata(COMMAND_HANDLER_METADATA, handler);
  }

}
