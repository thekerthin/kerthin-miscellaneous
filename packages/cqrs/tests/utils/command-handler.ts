import { CommandHandler, ICommandHandler } from '../../src';
import { TestCommand } from './command';

@CommandHandler(TestCommand)
export class TestCommandHandler implements ICommandHandler<TestCommand> {

  handle(command: TestCommand): void { }

}
