[![Node.js CI](https://github.com/stbestichhh/stlib-testing/actions/workflows/node.js.yml/badge.svg)](https://github.com/stbestichhh/stlib-utils/actions/workflows/node.js.yml)
[![NPM Version](https://img.shields.io/npm/v/@stlib/testing)](https://www.npmjs.com/package/@stlib/testing)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# @stlib/testing

## Table of contents

* [Description](#about)
* [Getting started](#getting-started)
  * [Instalation](#installation)
  * [Usage](#usage)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [Authors](#authors)
* [License](#license)

## About

**stlib/testing** - is an testing framework for node.js applications, which provides new testing experience to the TypeScript.

## Getting started

> [!IMPORTANT]
> **Node.js 18.x+** version must be installed in your OS.

### Installation

* Install dependency
  ```shell
  $ yarn add @stlib/testing
  ```

* Enable decorators in your `tsconfing.json`
  ```json
  {
    "experimentalDecorators": true
  }
  ```

### Usage

#### How to create tests and run tests

First you need is to create a `.spec.ts` or `.test.ts` file.

This testing framework uses decorators to define tests. You need to create a class with `@Test('Test suite name')` decorator. Each test must be a class method with decorator `@Case('test case description')`.
@Case description and @Test name can be ignored

**Example**:

```TypeScript
import { assertThat, Test, Case } from '@stlib/testing';

@Test('Example testing suite')
class MyTests {

  @Case('Example pass test case')
  checkIfTenIsMoreThatFive() {
    assertThat(10).toBeGreaterThan(5);
  }
  
  @Case()
  checkIfTenIsString() {
    assertThat(10).toBeTypeOf('string');
  }
}
```

To run tests, use cli command
```shell
$ stest
```

#### API
`assertThat(actual)`.to*(expected);

| Method                                      | Description                                                                                                                     |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `toEqual(expected: any)`                    | Check equality between actual and expected                                                                                      |
| `toNotEqual(expected: any)`                 | Check if actual and expected are not equal                                                                                      |
| `toStrictEqual(expected: any)`              | Check strict equality between actual and expected                                                                               |
| `toStrictNotEqual(expected: any)`           | Check if actual and expected are strict not equal                                                                               |
| `toBe(expected: any)`                       | Check if actual is expected                                                                                                     |
| `toBeTruthy()`                              | Check if actual is true                                                                                                         |
| `toBeFalsy()`                               | Check if actual is false                                                                                                        |
| `toBeGreaterThan(expected: number)`         | Check if actual is greater than expected                                                                                        |
| `toBeGreaterThanOrEqual(expected: number)`  | Check if actual is greater than or equals expected                                                                              |
| `toBeLessThan(expected: number)`            | Check if actual is less than expected                                                                                           |
| `toBeLessThanOrEqual(expected: number)`     | Check if actual is less than or equal expected                                                                                  |
| `toBeDefined()`                             | Check if actual is defined                                                                                                      |
| `toBeUndefined()`                           | Check if actual is undefined                                                                                                    |
| `toBeNull()`                                | Check if actual is null                                                                                                         |
| `toBeNotNull()`                             | Check if actual is not null                                                                                                     |
| `toBeTypeOf(type: any)`                     | Check if actual is type of expected. Example: `assertThat('a').toBeTypeOf('string')`, `assertThat(TypeError).toBeTypeOf(Error)` |
| `toHaveProperty(property: any)`             | Check if actual has expected property                                                                                           |
| `toThrow(expectedError?: ErrorConstructor)` | Check if actual throw an error or expected error                                                                                |
| `toNotThrow()`                              | Check if actual do not throw an error                                                                                           |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Changelog

Project changes are writen in changelog, see the [CHANGELOG.md](CHANGELOG.md).

We use [SemVer](https://semver.org/) for versioning.
For the versions available, see the [tags](https://github.com/stbestichhh/stlib-testing/tags) on this repository.
For the versions supported, see the [SECURITY.md](SECURITY.md).

## Authors

- [@stbestichhh](https://www.github.com/stbestichhh)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE)
