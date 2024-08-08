import { assertThat, Case, Test } from '@stlib/testing';

@Test()
class TestClass {

  @Case()
  testCaseOne() {
    assertThat(10).toBeGreaterThan(5);
  }

  @Case()
  testCaseTwo() {
    assertThat(10).toBeTypeOf('string');
  }

  @Case()
  testCaseThreee() {
    assertThat(10).toBeGreaterThan(5);
  }
}

@Test('Other suite')
class TestTwo {
  @Case()
  testCaseOne() {
    assertThat(10).toBeGreaterThan(5);
  }

  @Case()
  testCaseTwo() {
    assertThat(10).toBeTypeOf('string');
  }
}
