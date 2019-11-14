# kerthin-miscellaneous

This project is using [lerna](https://github.com/lerna/lerna) to manage all The Kerthin packages, so some common scripts are:

## Dependencies

```sh
$ npm i lerna@3.14.1 -g
```

## Setup

```sh
$ yarn
$ lerna  bootstrap
$ lerna link
```

## Internal commands

```sh
$ lerna run lint
$ lerna run test
$ lerna run build
```

## The Kerthin Packages

[@kerthin/cqrs](https://github.com/thekerthin/kerthin-miscellaneous/tree/master/packages/cqrs)

[@kerthin/utils](https://github.com/thekerthin/kerthin-miscellaneous/tree/master/packages/utils)

[@kerthin/logger](https://github.com/thekerthin/kerthin-miscellaneous/tree/master/packages/logger)

[@kerthin/bus](https://github.com/thekerthin/kerthin-miscellaneous/tree/master/packages/bus)
