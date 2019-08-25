import { Module, OnModuleInit } from '@nestjs/common';

import { ExplorerService } from './services/explore.service';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';

@Module({
  providers: [
    CommandBus,
    EventBus,
    ExplorerService,
  ],
  exports: [
    CommandBus,
    EventBus,
  ],
})
export class CqrsModule implements OnModuleInit {
  constructor(
    private readonly explorerService: ExplorerService,
    private readonly eventsBus: EventBus,
    private readonly commandsBus: CommandBus
  ) { }

  onModuleInit(): void {
    const commands = this.explorerService.getCommands();
    const events = this.explorerService.getEvents();

    this.commandsBus.register(commands);
    this.eventsBus.register(events);
  }

}
