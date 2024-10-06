import { assertThat, Test, Case } from '@stlib/testing';

@Test('Property Tests')
class PropertyTests {

  @Case('Should have property')
  checkHaveProperty() {
    const obj = { name: 'John', age: 30 };
    assertThat(obj)
      .toHaveProperty('name')
      .toHaveAllProperties(['name', 'age'])
      .toHaveAnyProperties(['a', 'age']);
  }

  @Case('Should satisfy predicate')
  checkLength() {
    assertThat([1, 2, 3, 4, 5]).toHaveLength(5);
  }

  @Case()
  checkPropertyEqual() {
    const obj = { name: 'John', age: 30 };
    assertThat(obj).toHavePropertyEqual('age', 30);
  }
}
