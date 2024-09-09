# Truthiness assertions

```typescript
import { assertThat, Test, Case } from '@stlib/testing';

@Test('Truthiness Assertions')
class TruthinessAssertions {
  @Case('Should be truthy')
  checkTruthy() {
    assertThat(true).toBeTruthy();
  }

  @Case('Should be falsy')
  checkFalsy() {
    assertThat(false).toBeFalsy();
  }
}
```
