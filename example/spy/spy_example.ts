import { assertThat, Case, Mock, spyOn, Test } from "@stlib/testing";

class ExampleClass {
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}

const greet = (name: string) => {
  return `Hello, ${name}!`;
}

@Test('Spying Example')
class SpyingTestSuite {

  @Case('should track function calls')
  testFunctionSpying() {
    const greetSpy = spyOn(greet);

    greetSpy.call('Alice');
    greetSpy.call('Bob');

    assertThat(greetSpy.getCallCount()).toEqual(2);
    assertThat(greetSpy.wasCalledWith('Alice')).toBeTruthy();
    assertThat(greetSpy.getCallArgs(1)[0]).toEqual('Bob');
  }

  @Case('should track method calls')
  testFunctionSpying() {
    const example = new ExampleClass();
    const greetSpy = spyOn(example, 'greet');

    example.greet('Alice');
    example.greet('Bob');

    assertThat(greetSpy.getCallCount()).toEqual(2);
    assertThat(greetSpy.wasCalledWith('Alice')).toBeTruthy();
    assertThat(greetSpy.getCallArgs(1)[0]).toEqual('Bob');
  }

  @Case('should track the order of method calls')
  testFunctionCallOrder() {
    const example = new ExampleClass();
    const greetSpy = spyOn(example, 'greet');

    example.greet('Alice');
    example.greet('Bob');

    const callOrder = greetSpy.getCallOrder();

    assertThat(callOrder[0]).toEqual(1);
    assertThat(callOrder[1]).toEqual(2);
  }

  @Case('should track errors thrown by the method')
  testFunctionThrowsError() {
    const example = new ExampleClass();
    const mock = new Mock(example);
    mock.mockMethod('greet', () => { throw new Error });
    const spy = spyOn(example, 'greet');


    let errorCaught = false;
    try {
      example.greet('Alice');
    } catch (e) {
      errorCaught = true;
    }

    assertThat(errorCaught).toBeTruthy();
    assertThat(spy.getThrownErrors()).toHaveLength(1);
  }
}
