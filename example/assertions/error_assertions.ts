import { assertThat, Test, Case } from '@stlib/testing';

@Test('Error Handling Tests')
class ErrorHandlingTests {

  @Case('Should throw error')
  checkThrowError() {
    const throwError = () => { throw new Error('Test Error'); };
    assertThat(throwError).toThrow(Error);
  }

  @Case('Should not throw error')
  checkNotThrowError() {
    const safeFunction = () => 'No Error';
    assertThat(safeFunction).toNotThrow();
  }

  @Case('Should throw not TypeError')
  checkNotThrowTypeError() {
    const throwError = () => { throw new Error('Test Error'); };
    assertThat(throwError).toNotThrow(TypeError);
  }
}
