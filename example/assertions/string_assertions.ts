import { assertThat, Test, Case } from '@stlib/testing';

@Test('String Tests')
class StringTests {

  @Case('Should start with')
  checkStartWith() {
    assertThat('Hello, World!').toStartWith('Hello');
  }

  @Case('Should end with')
  checkEndWith() {
    assertThat('Hello, World!').toEndWith('World!');
  }

  @Case('Should match regex')
  checkMatch() {
    assertThat('abcdef').toMatch(/abc/);
  }

  @Case('Should have length')
  checkLength() {
    assertThat('hello').toHaveLength(5);
  }
}
