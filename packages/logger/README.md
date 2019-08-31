# @kerthin/logger
@kerthin/logger is a package whose purpose is register logs through different log levels and can extends their behavior with strategy logics.

## Installation
Use npm or yarn to install `@kerthin/logger` package.

```sh
$ yarn add @kerthin/logger
$ npm i @kerthin/logger -S
```

## Getting Start

```typescript
import { Logger } from '@kerthin/logger';

Logger.log('the example template has been saved');
```

## Log Levels

The @kerthin/logger expose different log levels

- log
- error
- warm
- debug
- verbose

```typescript
import { Logger } from '@kerthin/logger';

Logger.log('...');
Logger.error('...');
Logger.warm('...');
Logger.debug('...');
Logger.verbose('...');
```

## Strategy

The idea behind strategy is customize the log throughput

```typescript
import { Logger, Strategy } from '@kerthin/logger';

class MyStrategy implements Strategy {

  constructor(
    public readonly level = 'log',
    public readonly runBehaviorByDefault = true
  ) { }

  execute(message: any, trace?: string, context?: string, isTimeDiffEnabled?: boolean): void {
    // your custom logic throughput
  }

}

Logger.setStrategy([
  new MyStrategy('log', true),
]);
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)