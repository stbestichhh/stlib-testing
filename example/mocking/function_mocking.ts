import { assertThat, Test, Case, MockFn } from '@stlib/testing';

@Test('Mock Function Tests')
class MockFunctionTests {

  @Case('Should call mock function')
  checkMockFunctionCalled() {
    const originalFunction = (a: number, b: number) => a + b;
    const mockFn = new MockFn(originalFunction);
    mockFn.mock((a, b) => a * b);

    mockFn.call(2, 3);

    mockFn.verifyCalled(1);
    mockFn.verifyCalledWith([2, 3]);
  }

  @Case('Should restore original function')
  checkRestoreFunction() {
    const originalFunction = (a: number, b: number) => a + b;
    const mockFn = new MockFn(originalFunction);
    mockFn.mock((a, b) => a * b);

    mockFn.restore();
    assertThat(mockFn.call(2, 3)).toBe(5);
  }
}
