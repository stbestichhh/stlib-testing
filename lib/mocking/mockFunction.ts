import { AnyFunction } from '../types';
import { MockingException } from '../exceptions';

export class MockFn {
  private readonly originalFunction: AnyFunction;
  private callCount: number = 0;
  private args: any[][] = [];

  constructor(private fn: AnyFunction) {
    this.originalFunction = fn;
  }

  public mock(implementation: AnyFunction) {
    this.fn = (...args: any[]) => {
      this.callCount++;
      this.args.push(args);
      return implementation(...args);
    };
  }

  public verifyCalled(expectedCallCount: number) {
    if (this.callCount !== expectedCallCount) {
      throw new MockingException(`Expected function to be called ${JSON.stringify(expectedCallCount)} times, but it was called ${JSON.stringify(this.callCount)} times`);
    }
  }

  public verifyCalledWith(expectedArgs: any[]) {
    const wasCalledWith = this.args.some((callArgs) => JSON.stringify(callArgs) === JSON.stringify(expectedArgs));

    if (!wasCalledWith) {
      throw new MockingException(`Expected function to be called with ${JSON.stringify(expectedArgs)} arguments`);
    }
  }

  public restore() {
    this.fn = this.originalFunction;
  }

  public getFunction() {
    return this.fn;
  }

  public call(...args: any[]) {
    return this.fn(...args);
  }
}
