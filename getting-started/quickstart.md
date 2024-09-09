---
description: How to install, set up and start writing tests
---

# Quickstart

{% hint style="warning" %}
Node.js 18.x+ has to be installed.
{% endhint %}

## Installation

1. Add dependency to you project

{% code fullWidth="false" %}
```bash
yarn add --dev @stlib/testing
# or
npm install --save-dev @stlib/testing
```
{% endcode %}

2. Enable **eperimentalDecorators** in your **tsconfig.json**

{% code title="tsconfig.json" %}
```json
{
    ...
    "experimentalDecorators": true,
    ...
}
```
{% endcode %}

Now you can write tests.

## Writing tests

First you need is to create a `.spec.ts` or `.test.ts` file.

This testing framework uses decorators to define tests. You need to create a class with `@Test('Test suite name')` decorator. Each test must be a class method with decorator `@Case('test case description')`. `@Case` description and `@Test` name can be ignored

**Example:**

{% code title="example.spec.ts" overflow="wrap" lineNumbers="true" %}
```typescript
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
{% endcode %}

Run tests with command:

```bash
npx stest
```

And get result:

<figure><img src="../.gitbook/assets/image.png" alt="Command output with test results"><figcaption></figcaption></figure>
