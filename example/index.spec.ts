import { assertThat, Case, Test } from '@stlib/testing';

@Test('First test suite')
class TestClass {

  @Case('First case')
  testCaseOne() {
    assertThat(10).toBeGreaterThan(5);
  }

  @Case('Second case')
  testCaseTwo() {
    assertThat(10).toBeTypeOf('string');
  }

  @Case('Third case')
  testCaseThreee() {
    assertThat(10).toBeGreaterThan(5);
  }
}

@Test('Other suite')
class TestTwo {
  @Case('First case')
  testCaseOne() {
    assertThat(10).toBeGreaterThan(5);
  }

  @Case('Second case')
  testCaseTwo() {
    assertThat(10).toBeTypeOf('string');
  }
}
