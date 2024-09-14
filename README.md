<div align="center">

# sTest

[![NPM Version](https://img.shields.io/npm/v/@stlib/testing)](https://www.npmjs.com/package/@stlib/testing)
![NPM Downloads](https://img.shields.io/npm/d18m/%40stlib%2Ftesting)

[![Node.js CI](https://github.com/stbestichhh/stlib-testing/actions/workflows/node.js.yml/badge.svg)](https://github.com/stbestichhh/stlib-utils/actions/workflows/node.js.yml)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**[See docs >>](https://stbetsichhhs-organization.gitbook.io/stest-or-typescript-testing-framework)**

</div>

## Table of contents

* [Description](#about)
* [Getting started](#getting-started)
  * [Command Line Interface](#cli)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Configuration](#configuration)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [Authors](#authors)
* [License](#license)

## About

**sTest** - is an testing framework for node.js applications, which provides new testing experience to the TypeScript.

## Getting started

> [!IMPORTANT]
> **Node.js 18.x+** version must be installed in your OS.

### CLI
```text
Usage: npx stest [options]

Testing framework for TypeScript Node.js applications

Options:
  --init [extension]   initialise configuration file [json | yml | ts | js]
  -w, --watch          run tests in watch mode
  -c, --config <path>  define custom config file path
```

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

> [!NOTE]
> You can see test examples [here](example)

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
$ npx stest
```

#### Decorators API

> [!NOTE]
> You can see test examples [here](example)

| Decorator                                                   | Description                                                                                                                     |
|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `@Test(description?: string)`                               | Define a class as a test suite                                                                                                  |
| `@Case(description?: string)`                               | Define method as a test case                                                                                                    |
| `@Case({ description?: string, timeout?: number })`         | Define method as a test case with custom timeout time                                                                           |
| `@DataSet(...dataSets: any[][])`                            | Define data sets for multiple running one test case with different data                                                         |
| `@DataTable(dataTable: { inputs: any[], expected: any }[])` | Define data table for multiple running one test case with different data. **Data table prevents running tests with data sets.** |
| `@AfterAll(description?: string)`                           | Force method to run after all test cases                                                                                        |
| `@BeforeAll(description?: string)`                          | Force method to run before all test cases                                                                                       |
| `@AfterEach(description?: string)`                          | Runs after each test case                                                                                                       |
| `@BeforeEach(description?: string)`                         | Runs before each test case                                                                                                      |

#### Assertions API
`assertThat(actual).to*(expected);`

| Method                                                         | Description                                                                                                                                             |
|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `toEqual(expected: any)`                                       | Check equality between actual and expected                                                                                                              |
| `toNotEqual(expected: any)`                                    | Check if actual and expected are not equal                                                                                                              |
| `toStrictEqual(expected: any)`                                 | Check strict equality between actual and expected                                                                                                       |
| `toStrictNotEqual(expected: any)`                              | Check if actual and expected are strict not equal                                                                                                       |
| `toBe(expected: any)`                                          | Check if actual is an expected                                                                                                                          |
| `toNotBe(expected: any)`                                       | Check if actual is not an expected                                                                                                                      |
| `toBeTruthy()`                                                 | Check if actual is true                                                                                                                                 |
| `toBeFalsy()`                                                  | Check if actual is false                                                                                                                                |
| `toBeGreaterThan(expected: number)`                            | Check if actual is greater than expected                                                                                                                |
| `toBeGreaterThanOrEqual(expected: number)`                     | Check if actual is greater than or equals expected                                                                                                      |
| `toBeLessThan(expected: number)`                               | Check if actual is less than expected                                                                                                                   |
| `toBeLessThanOrEqual(expected: number)`                        | Check if actual is less than or equal expected                                                                                                          |
| `toBeDefined()`                                                | Check if actual is defined                                                                                                                              |
| `toBeUndefined()`                                              | Check if actual is undefined                                                                                                                            |
| `toBeNull()`                                                   | Check if actual is null                                                                                                                                 |
| `toBeNotNull()`                                                | Check if actual is not null                                                                                                                             |
| `toBeNaN()`                                                    | Check if actual is NaN                                                                                                                                  |
| `toBeFinite()`                                                 | Check if actual is finite number                                                                                                                        |
| `toBeTypeOf(type: any)`                                        | Check if actual is type of expected. Example: `assertThat('a').toBeTypeOf('string')`, `assertThat(TypeError).toBeTypeOf(Error)`                         |
| `toHaveProperty(property: any)`                                | Check if actual has expected property                                                                                                                   |
| `toThrow(expectedError?: ErrorConstructor, ...args: any[])`    | Check if actual throw an error or expected error. Also you can provide arguments for actual function                                                    |
| `toNotThrow(expectedError?: ErrorConstructor, ...args: any[])` | Check if actual do not throw an error or do not throw an error provided to as 'expectedError' param. Also you can provide arguments for actual function |
| `toContain(expected: any)`                                     | Check if actual contains a value from expected                                                                                                          |
| `toContainEqual(expected: any)`                                | Check if actual contains a value which equal to value from expected                                                                                     |
| `toMatch(expected: RegExp or string)`                          | Check if actual mathes to expected regular expression                                                                                                   |
| `toHaveLength(expected: number)`                               | Check if actual has expected length                                                                                                                     |
| `toStartWith(expected: string)`                                | Check if actual starts with expected string                                                                                                             |
| `toEndWith(expected: string)`                                  | Check if actual ends with expected string                                                                                                               |
| `toSatisfy(predicate: (value: any) => boolean)`                | Check if actual satisfies a predicate                                                                                                                   |
| `toIncludeAllMembers(expected: any[])`                         | Check if actual includes all members of expected array                                                                                                  |
| `toIncludeAnyMembers(expected: any[])`                         | Check if actual includes at least one member of expected array                                                                                          |

#### Mocking API
 
| Class          | Method                                                                      | Description                                               |
|----------------|-----------------------------------------------------------------------------|-----------------------------------------------------------|
| `MockRegistry` | `restoreAll()`                                                              | Restores all created mocks                                |
| `MockFn`       | `new MockFn(functionToMock: Function, implementation?: Function)`           | Creates function mock                                     |
|                | `mockFn.mock(implementation?: Function)`                                    | Mocks a function                                          |
|                | `mockFn.verifyCalled(expectedCallcount: number)`                            | Verifies function has been called expected times          |
|                | `mockFn.verifyCalledWith(expectedArguments: any[])`                         | Verifies function has been called with expected arguments |
|                | `mockFn.restore()`                                                          | Restores original function logic                          |
|                | `mockFn.getFunction()`                                                      | Returns fuction                                           |
|                | `mockFn.call(...args: any[])`                                               | Call function                                             |
| `MockModule`   | `new MockModule(moduleName: string)`                                        | Creates module mock                                       |
|                | `mockModule.mockMethod(methodName: string, implementation: Function)`       | Mocks a function                                          |
|                | `mockModule.verifyCalled(methodName: string, expectedCallcount: number)`    | Verifies function has been called expected times          |
|                | `mockModule.verifyCalledWith(methodName: string, expectedArguments: any[])` | Verifies function has been called with expected arguments |
|                | `mockModule.restoreMethod(methodName: string)`                              | Restores original function logic                          |
|                | `mockModule.restoreAll()`                                                   | Restores all functios                                     |
| `Mock`         | `new Mock(instance: T)`                                                     | Creates class instance mock                               |
|                | `mockClass.mockMethod(methodName: string, implementation: Function)`        | Mocks a function                                          |
|                | `mockClass.verifyCalled(methodName: string, expectedCallcount: number)`     | Verifies function has been called expected times          |
|                | `mockClass.verifyCalledWith(methodName: string, expectedArguments: any[])`  | Verifies function has been called with expected arguments |
|                | `mockClass.restoreMethod(methodName: string)`                               | Restores original function logic                          |
|                | `mockClass.restoreAll()`                                                    | Restores all functios                                     |

#### Spy API

Create a new spy by `spyOn` function:
```TypeScript
const example = new ExampleClass();
const greetSpy = spyOn(example, 'greet');
```

| Class                                    | Method                                | Description                                                                 |
|------------------------------------------|---------------------------------------|-----------------------------------------------------------------------------|
| `spyOn(object: any, methodName: string)` |                                       | Creates new spy on class method                                             |
|                                          | `getCallCount()`                      | Returns amount of method calls                                              |
|                                          | `getCallOrder()`                      | Returns an array with call order                                            |
|                                          | `getCallResults(callIndex?: number)`  | Returns an array with call results                                          |
|                                          | `getCallArgs(callIndex?: number)`     | Returns an array with arguments passed                                      |
|                                          | `getThrownErrors(callIndex?: number)` | Returns an array with with all thrown errors                                |
|                                          | `wasCalled(amount?: number)`          | Returns true if method was called at least once or more than `amount` times |
|                                          | `wasCalledWith(...args: any[])`       | Returns true if method was called with specified arguments at least once    |

#### Configuration
To provide custom configuration for `stest` create `stest.config.{json,yml,ts,js}` file in project base directory. \
Or use this command to initialize config file. By default it has `json` format. Override it by adding one of the possible options for the `--init` flag: `ts, js, json, yml`
```shell
$ npx stest --init
```

Also it is possible to define custom path to the config file using `--config` flag.
```shell
$ npx stest --config ./configs/test.conf.yml
```

Config properties:
* pattern - tests path pattern
* ignore - files and directories to ignore
* autoClearMocks - clears all created mocks after each test,
* cacheWatcher - enables caching in watch mode, to run only new or changed tests

Config file example:

  * json:
    ```json
    {
      "pattern": "test/**/*.{spec,test}.ts",
      "ignore": ["node_modules", "lib"],
      "autoClearMocks": true,
      "cacheWatcher": false
    }
    ```

  * yaml:
    ```yaml
    pattern: "test/**/*.{spec,test}.ts"
    ignore:
      - node_modules
      - lib
    autoClearMocks: true
    cacheWatcher: false
    ```
  
  * TS/JS:
    ```TypeScript
    import { StestConfig } from "@stlib/testing";

    const config: StestConfig = {
      pattern: "test/**/*.{spec,test}.ts",
      ignore: ["node_modules", "lib"],
      autoClearMocks: true,
      cacheWatcher: false,
    };
    export default config;
    ```

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
