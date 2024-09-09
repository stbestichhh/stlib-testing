# Collections assertions

```typescript
import { assertThat, Test, Case } from '@stlib/testing';

@Test('Collection Tests')
class CollectionTests {

  @Case('Should contain value')
  checkContain() {
    assertThat([1, 2, 3]).toContain(2);
  }

  @Case('Should contain equal value')
  checkContainEqual() {
    assertThat([{ id: 1 }, { id: 2 }]).toContainEqual({ id: 2 });
  }

  @Case('Should include all members')
  checkIncludeAllMembers() {
    assertThat([1, 2, 3, 4, 5]).toIncludeAllMembers([2, 4]);
  }

  @Case('Should include any members')
  checkIncludeAnyMembers() {
    assertThat([1, 2, 3, 4, 5]).toIncludeAnyMembers([6, 3]);
  }
}
```
