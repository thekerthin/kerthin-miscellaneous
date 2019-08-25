# @kerthin/cqrs
@kerthin/cqrs is a package with cqrs definitions which guides you build systems more decouple.

## Installation
Use npm or yarn to install `@kerthin/cqrs` package.

```sh
$ yarn add @kerthin/cqrs
$ npm i @kerthin/cqrs -S
```

## Usage
1. Import `CqrsModule` module and set adapter.

```typescript
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, CommandBus, EventBus, RabbitMQBusAdapter } from '@kerthin/cqrs';

@Module({
  imports: [ CqrsModule ],
  providers: [
    ExampleCreatedEvent,
    ExampleDomainService
  ]
})
class ExampleModule implements OnModuleInit {

  async onModuleInit() {
    const exchange = 'example';
    const service = 'example-domain-service';
    const host = 'amqp://local:password@rabbitmq?heartbeat=30';

    await this.eventBus
      .setAdapter(new RabbitMQBusAdapter(exchange, host, service))
      .init()
  }

}
```

2. Register handle

```typescript
import { IEventHandler, EventHandler, Event } from '@kerthin/cqrs';

export class ExampleDomainEntity {
  id: string;
  name: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string;
}

export class ExampleCreatedDto extends Event<ExampleDomainEntity> {
  data: ExampleDomainEntity;
  context: string = 'example';
  action: string = 'exampleCreated';
}

@EventHandler(ExampleCreatedDto)
export class ExampleCreatedEvent implements IEventHandler<ExampleCreatedDto> {

  handle(event: ExampleCreatedDto): void { }

}
```

3. EmitEvent through decorator

```typescript
import { Injectable } from '@nestjs/common';
import { EmitEvent, EventBus } from '@kerthin/cqrs';

@Injectable()
export class ExampleDomainService {

  constructor(private readonly eventBus: EventBus) { }

  @EmitEvent({ context: 'example', action: 'exampleCreated' })
  create(data: ExampleDomainEntity) { }

}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)