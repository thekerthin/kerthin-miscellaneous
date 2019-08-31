import { LogLevel } from '@nestjs/common';

export interface Strategy {
  level: LogLevel;
  runBehaviorByDefault?: boolean;
  execute(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean): void;
}
