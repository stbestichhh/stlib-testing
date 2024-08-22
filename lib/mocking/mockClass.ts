import { AnyFunction, MethodNames } from '../types';
import { MockingException } from '../exceptions';

export class Mock<T> {
  private callCounts = new Map<string, number>();
  private methodStubs = new Map<string, AnyFunction>();
  private originalMethods = new Map<string, AnyFunction>();
  private callArgs = new Map<string, any[][]>();
  private readonly instance: any;

  constructor(private target: T) {
    this.instance = target as any;
  }

  public mockMethod<K extends MethodNames<T> & string>(
    methodName: K,
    implementation: AnyFunction,
  ) {
    if (!this.instance[methodName]) {
      throw new MockingException(
        `Method ${JSON.stringify(methodName)} does not exist on target.`,
      );
    }

    this.originalMethods.set(methodName, this.instance[methodName]);
    this.callArgs.set(methodName, []);
    this.methodStubs.set(methodName, implementation);
    this.callCounts.set(methodName, 0);

    this.instance[methodName] = (...args: any[]) => {
      const stub = this.methodStubs.get(methodName);
      if (!stub) {
        throw new MockingException(
          `Method ${JSON.stringify(methodName)} was not mocked.`,
        );
      }

      this.callCounts.set(
        methodName,
        (this.callCounts.get(methodName) || 0) + 1,
      );
      this.callArgs.get(methodName)?.push(args);
      return stub(...args);
    };
  }

  public verifyCalled<K extends MethodNames<T> & string>(
    methodName: K,
    expectedCallCount: number,
  ) {
    const actualCallCount = this.callCounts.get(methodName) || 0;
    if (actualCallCount !== expectedCallCount) {
      throw new MockingException(
        `Expected ${JSON.stringify(methodName)} to be called ${expectedCallCount} times, but it was called ${actualCallCount} times.`,
      );
    }
  }

  public verifyCalledWith<K extends MethodNames<T> & string>(
    methodName: K,
    expectedArgs: any[],
  ) {
    const argsList = this.callArgs.get(methodName);
    if (!argsList || argsList.length === 0) {
      throw new MockingException(
        `Method ${JSON.stringify(methodName)} was not called`,
      );
    }

    const match = argsList.some(
      (args) =>
        args.length === expectedArgs.length &&
        args.every((arg, index) => arg === expectedArgs[index]),
    );

    if (!match) {
      throw new MockingException(
        `Method ${JSON.stringify(methodName)} was not called with expected arguments ${JSON.stringify(expectedArgs)}`,
      );
    }
  }

  public restoreMethod<K extends MethodNames<T> & string>(methodName: K) {
    const originalMethod = this.originalMethods.get(methodName);

    if (originalMethod) {
      this.instance[methodName] = originalMethod;
    }

    this.methodStubs.delete(methodName);
    this.callCounts.delete(methodName);
    this.originalMethods.delete(methodName);
    this.callArgs.delete(methodName);
  }

  public restoreAll() {
    for (const [methodName, originalMethod] of this.originalMethods) {
      this.instance[methodName] = originalMethod;
    }

    this.methodStubs.clear();
    this.callCounts.clear();
    this.originalMethods.clear();
    this.callArgs.clear();
  }
}
