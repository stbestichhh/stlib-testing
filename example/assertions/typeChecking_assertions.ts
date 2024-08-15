import { assertThat, Test, Case } from '@stlib/testing';

@Test('Type Checking')
class TypeCheckingTests {

  @Case('Should be defined')
  checkDefined() {
    const value = 42;
    assertThat(value).toBeDefined();
  }

  @Case('Should be undefined')
  checkUndefined() {
    let value;
    assertThat(value).toBeUndefined();
  }

  @Case('Should be null')
  checkNull() {
    const value = null;
    assertThat(value).toBeNull();
  }

  @Case('Should be not null')
  checkNotNull() {
    const value = 42;
    assertThat(value).toBeNotNull();
  }

  @Case('Should be NaN')
  checkNaN() {
    const value = NaN;
    assertThat(value).toBeNaN();
  }

  @Case('Should be finite')
  checkFinite() {
    assertThat(100 / 2).toBeFinite();
  }
}
