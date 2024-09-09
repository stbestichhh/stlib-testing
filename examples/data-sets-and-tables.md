---
description: How to use @DataSet and @DataTable decorators in tests
---

# Data sets and tables

{% hint style="info" %}
`@DataSet` and `@DataTable` have the same functionality. Only difference is the way you define data for the tests.
{% endhint %}

## @DataSet()

```typescript
import { assertThat, Case, Test, DataSet } from "@stlib/testing";

@Test()
class DataSetExample {

  @Case()
  @DataSet([1, 2, 3], [2, 3, 5], [3, 5, 8])
  testAddition(a: number, b: number, expected: number) {
    const result = a + b;
    assertThat(result).toEqual(expected);
  }
}
```

## @DataTable()

```typescript
import { assertThat, Case, Test, DataTable } from "@stlib/testing";

@Test()
class DataTableExample {

  @Case()
  @DataTable([
    { inputs: [1, 2], expected: 3 },
    { inputs: [2, 3], expected: 5 },
    { inputs: [3, 5], expected: 8 },
  ])
  testAddition(a: number, b: number, expected: number) {
    const result = a + b;
    assertThat(result).toEqual(expected);
  }
}
```
