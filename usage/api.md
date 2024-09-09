---
description: Assertions, Decorators, Mocking, Spies and etc.
---

# API

## Examples

{% hint style="info" %}
Code examples can be found [here](api.md#examples)
{% endhint %}

## Defining tests

<table data-view="cards"><thead><tr><th>Decorator</th><th>Description</th></tr></thead><tbody><tr><td><code>@Test(description?: string)</code></td><td>this class decorator defines a test suite. Can accept a string parameter as a test suite's description or name.</td></tr><tr><td><code>@Case(description?: string)</code></td><td>method decorator. Defines a test case inside a test suite. Accepts string parameter as test case description or name. </td></tr><tr><td><code>@Case({ description?: string, timeout?: number })</code></td><td>method decorator. Defines a test case inside a test suite. Accepts object parameter, where can be defined test description and timeout. By default, timeout is 5 seconds per test case.</td></tr><tr><td><code>@DataSet(...dataSets: any[][])</code></td><td>method decorator. Used to define data set for the test case. It allows to run one test case multiple times using different data.</td></tr><tr><td><code>@DataTable(dataTable: { inputs: any[], expected: any }[])</code></td><td>method decorator. The same as <code>@DataSet()</code> decorator, but accepts data in table format instead of arrays with data.</td></tr><tr><td><code>@AfterAll(description?: string)</code></td><td>method decorators, used to define methods which will run after or before all test cases.</td></tr><tr><td><code>@BeforeAll(description?: string)</code></td><td>method decorators, used to define methods which will run after or before all test cases.</td></tr><tr><td><code>@AfterEach(description?: string)</code></td><td>method decorators, used to define methods which will run after or before each test case.</td></tr><tr><td><code>@BeforeEach(description?: string)</code></td><td>method decorators, used to define methods which will run after or before each test case.</td></tr></tbody></table>

## Assertions

{% hint style="info" %}
Code examples can be found [here](../examples/assertions/)
{% endhint %}

sTest framework provides custom assertions to make your tests easier to write. Pass actual result to `assertThat()` function, and then call the method and pass expected as a parameter.

| Method                                                         | Description                                                                                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

## Mocking

{% hint style="info" %}
Code examples can be found [here](../examples/mocking/)
{% endhint %}

sTest framework provides functionality to mock module, class and functions implementation.

| Class          | Method                                                                      | Description                                               |
| -------------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| `MockRegistry` | `restoreAll()`                                                              | Restores all created mocks                                |
| `MockFn`       | `new MockFn(functionToMock: Function, implementation?: Function)`           | Creates function mock                                     |
|                | `mockFn.mock(implementation?: Function)`                                    | Mocks a function                                          |
|                | `mockFn.verifyCalled(expectedCallcount: number)`                            | Verifies function has been called expected times          |
|                | `mockFn.verifyCalledWith(expectedArguments: any[])`                         | Verifies function has been called with expected arguments |
|                | `mockFn.restore()`                                                          | Restores original function logic                          |
|                | `mockFn.getFunction()`                                                      | Returns function                                          |
|                | `mockFn.call(...args: any[])`                                               | Call function                                             |
| `MockModule`   | `new MockModule(moduleName: string)`                                        | Creates module mock                                       |
|                | `mockModule.mockMethod(methodName: string, implementation: Function)`       | Mocks a function                                          |
|                | `mockModule.verifyCalled(methodName: string, expectedCallcount: number)`    | Verifies function has been called expected times          |
|                | `mockModule.verifyCalledWith(methodName: string, expectedArguments: any[])` | Verifies function has been called with expected arguments |
|                | `mockModule.restoreMethod(methodName: string)`                              | Restores original function logic                          |
|                | `mockModule.restoreAll()`                                                   | Restores all functions                                    |
| `Mock`         | `new Mock(instance: T)`                                                     | Creates class instance mock                               |
|                | `mockClass.mockMethod(methodName: string, implementation: Function)`        | Mocks a function                                          |
|                | `mockClass.verifyCalled(methodName: string, expectedCallcount: number)`     | Verifies function has been called expected times          |
|                | `mockClass.verifyCalledWith(methodName: string, expectedArguments: any[])`  | Verifies function has been called with expected arguments |
|                | `mockClass.restoreMethod(methodName: string)`                               | Restores original function logic                          |
|                | `mockClass.restoreAll()`                                                    | Restores all functions                                    |

## Spy

{% hint style="info" %}
Code examples can be found [here](../examples/spy.md)
{% endhint %}

sTest also provided spying functionality, to track function calls.

Create a new spy using `spyOn` function:

```TypeScript
const example = new ExampleClass();
const greetSpy = spyOn(example, 'greet');
```

| Class                                    | Method                                | Description                                                                 |
| ---------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `spyOn(object: any, methodName: string)` |                                       | Creates new spy on class method                                             |
|                                          | `getCallCount()`                      | Returns amount of method calls                                              |
|                                          | `getCallOrder()`                      | Returns an array with call order                                            |
|                                          | `getCallResults(callIndex?: number)`  | Returns an array with call results                                          |
|                                          | `getCallArgs(callIndex?: number)`     | Returns an array with arguments passed                                      |
|                                          | `getThrownErrors(callIndex?: number)` | Returns an array with with all thrown errors                                |
|                                          | `wasCalled(amount?: number)`          | Returns true if method was called at least once or more than `amount` times |
|                                          | `wasCalledWith(...args: any[])`       | Returns true if method was called with specified arguments at least once    |
