import { assertThat, Test, Case, Mock } from '@stlib/testing';

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

@Test('Mock Class Instance Tests')
class MockClassTests {

  @Case('Should mock class method')
  checkMockClassMethod() {
    const calculator = new Calculator();
    const mock = new Mock(calculator);
    mock.mockMethod('add', (a, b) => a * b);

    const result = calculator.add(2, 3);
    assertThat(result).toBe(6);

    mock.restoreMethod('add');
    assertThat(calculator.add(2, 3)).toBe(5);
  }
}
