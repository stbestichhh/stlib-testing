import { AnyFunction } from '../types';
import { MockingException } from '../exceptions';
import { MockRegistry } from './mock.registry';

export class MockModule {
  private originalMethods = new Map<string, AnyFunction>();
  private callCounts = new Map<string, number>();
  private callArgs = new Map<string, any[][]>();

  constructor(private moduleName: string) {
    MockRegistry.registerMock(this);
  }

  public mockMethod(methodName: string, implementation: AnyFunction) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    if (!module[methodName]) {
      throw new MockingException(
        `Method ${JSON.stringify(methodName)} does not exist on target.`,
      );
    }

    this.originalMethods.set(methodName, module[methodName]);

    this.callCounts.set(methodName, 0);
    this.callArgs.set(methodName, []);

    const mockImplementation = (...args: any[]) => {
      this.callCounts.set(
        methodName,
        (this.callCounts.get(methodName) || 0) + 1,
      );
      this.callArgs.get(methodName)?.push(args);
      return implementation(...args);
    };

    module[methodName] = mockImplementation;
  }

  public verifyCalled(methodName: string, expectedCallCount: number) {
    const actualCallCount = this.callCounts.get(methodName) || 0;
    if (actualCallCount !== expectedCallCount) {
      throw new MockingException(
        `Expected ${JSON.stringify(methodName)} to be called ${expectedCallCount} times, but it was called ${actualCallCount} times.`,
      );
    }
  }

  public verifyCalledWith(methodName: string, expectedArgs: any[]) {
    const argsList = this.callArgs.get(methodName);
    if (!argsList || argsList.length === 0) {
      throw new MockingException(`Method ${methodName} was not called.`);
    }

    const match = argsList.some(
      (args) =>
        args.length === expectedArgs.length &&
        args.every((arg, index) => arg === expectedArgs[index]),
    );

    if (!match) {
      throw new MockingException(
        `Method ${JSON.stringify(methodName)} was not called with expected arguments ${JSON.stringify(expectedArgs)}.`,
      );
    }
  }

  public restoreMethod(methodName: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    if (this.originalMethods.has(methodName)) {
      module[methodName] = this.originalMethods.get(methodName);
      this.originalMethods.delete(methodName);
      this.callCounts.delete(methodName);
      this.callArgs.delete(methodName);
    }
  }

  public restoreAll() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    for (const [methodName, originalMethod] of this.originalMethods.entries()) {
      module[methodName] = originalMethod;
    }

    this.originalMethods.clear();
    this.callCounts.clear();
    this.callArgs.clear();
  }
}
