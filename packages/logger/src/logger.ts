import { Logger as NestLogger, LogLevel } from '@nestjs/common';
import { Strategy } from './interfaces/strategy.interface';

export class Logger extends NestLogger {

  private static strategies: Strategy[] = [];

  static setStrategy(strategies: Strategy[]) {
    Logger.strategies = strategies;
  }

  private static findStrategy(logLevel: LogLevel): Strategy {
    return Logger.strategies.find(({ level }) => (level === logLevel));
  }

  static log(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    const strategy = Logger.findStrategy('log');

    if (strategy) {
      strategy.runBehaviorByDefault && NestLogger.log(message, context, isTimeDiffEnabled);
      strategy.execute(message, null, context, isTimeDiffEnabled);
      return;
    }

    NestLogger.log(message, context, isTimeDiffEnabled);
  }

  static error(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean) {
    const strategy = Logger.findStrategy('error');

    if (strategy) {
      strategy.runBehaviorByDefault && NestLogger.error(message, trace, context, isTimeDiffEnabled);
      strategy.execute(message, trace, context, isTimeDiffEnabled);
      return;
    }

    NestLogger.error(message, trace, context, isTimeDiffEnabled);
  }

  static warn(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    const strategy = Logger.findStrategy('warn');

    if (strategy) {
      strategy.runBehaviorByDefault && NestLogger.warn(message, context, isTimeDiffEnabled);
      strategy.execute(message, null, context, isTimeDiffEnabled);
      return;
    }

    NestLogger.warn(message, context, isTimeDiffEnabled);
  }

  static debug(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    const strategy = Logger.findStrategy('debug');

    if (strategy) {
      strategy.runBehaviorByDefault && NestLogger.debug(message, context, isTimeDiffEnabled);
      strategy.execute(message, null, context, isTimeDiffEnabled);
      return;
    }

    NestLogger.debug(message, context, isTimeDiffEnabled);
  }

  static verbose(message: any, context?: string, isTimeDiffEnabled?: boolean) {
    const strategy = Logger.findStrategy('verbose');

    if (strategy) {
      strategy.runBehaviorByDefault && NestLogger.verbose(message, context, isTimeDiffEnabled);
      strategy.execute(message, null, context, isTimeDiffEnabled);
      return;
    }

    NestLogger.verbose(message, context, isTimeDiffEnabled);
  }

}
