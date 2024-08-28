import { assertThat, Test, Case, Mock, AfterEach } from '@stlib/testing';

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  async addAsync(a: number, b: number): Promise<number> {
    return new Promise((resolve) => {
      resolve(a + b);
    });
  }
}

@Test('Mock Class Instance Async Tests')
class MockClassTests {
  private calculator = new Calculator();
  private mock = new Mock(this.calculator);

  @AfterEach()
  afterEach() {
    this.mock.restoreAll();
  }

  @Case('Should mock async method with sync implementation and restore then')
  async shouldMockAsyncMethodToSyncAndRestore() {
    const calculator = new Calculator();
    const mock = new Mock(calculator);
    mock.mockMethod('addAsync', (a, b) => a * b);

    const result = calculator.addAsync(2, 3);
    assertThat(result).toBe(6);

    mock.restoreMethod('addAsync');
    assertThat(await calculator.addAsync(2, 3)).toBe(5);
  }

  @Case()
  async shouldMockSyncMethodToAsyncAndRestore() {
    const calculator = new Calculator();
    const mock = new Mock(calculator);
    mock.mockMethod('add', async (a, b) => a * b);

    const result = await calculator.add(2, 3);
    assertThat(result).toBe(6);

    mock.restoreMethod('add');
    assertThat(calculator.add(2, 3)).toBe(5);
  }

  @Case()
  shouldMockMethod() {
    this.mock.mockMethod('add', async (a, b) => a * b);
  }

  @Case()
  shouldRunRestoredFunction() {
    assertThat(this.calculator.add(5, 2)).toBe(7);
  }
}
