import { assertThat, Case, Test } from "@stlib/testing";

@Test()
class TestAsyncCode {

  @Case()
  async testAsyncFunction() {
    assertThat(await this.testFunc()).toBe('Hello');
  }

  testFunc() {
    return new Promise((resolve) => {
      resolve('Hello');
    })
  }
}
