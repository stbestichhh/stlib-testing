# Comparison assertions

```typescript
import { assertThat, Test, Case } from '@stlib/testing';

@Test('Comparison Tests')
class ComparisonTests {

  @Case('Should be greater than')
  checkGreaterThan() {
    assertThat(10).toBeGreaterThan(5);
  }

  @Case('Should be greater than or equal')
  checkGreaterThanOrEqual() {
    assertThat(10).toBeGreaterThanOrEqual(10);
  }

  @Case('Should be less than')
  checkLessThan() {
    assertThat(5).toBeLessThan(10);
  }

  @Case('Should be less than or equal')
  checkLessThanOrEqual() {
    assertThat(5).toBeLessThanOrEqual(5);
  }
}
```
