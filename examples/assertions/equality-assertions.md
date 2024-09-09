# Equality assertions

```typescript
import { assertThat, Test, Case } from '@stlib/testing';

@Test('Equality Assertions')
class EqualityAssertions {

  @Case('Should equal')
  checkEqual() {
    assertThat(5 + 5).toEqual(10);
  }

  @Case('Should not equal')
  checkNotEqual() {
    assertThat(5 + 5).toNotEqual(11);
  }
}
```
