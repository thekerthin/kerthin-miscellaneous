import { ICommand } from '../commands/command.interface';
import { IEvent } from '../events/event.interface';
import { ICommandDto } from '../commands/command-dto-interface';
import { IEventDto } from '../events/event-dto.interface';
import { Handler } from '../../types';

export interface IBusAdapter {
  publish(data: ICommand<ICommandDto> | IEvent<IEventDto>): Promise<any> | any;
  setHandlers(handlers: Map<string, Handler>): this;
  init(): Promise<void> | void;
}
