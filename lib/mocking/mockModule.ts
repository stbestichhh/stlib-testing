import { AnyFunction } from '../types';

export class MockModule {
  private originalMethods: Map<string, AnyFunction>;

  constructor(private moduleName: string) {
    this.originalMethods = new Map<string, AnyFunction>();
  }

  public mockMethod(methodName: string, implementation: AnyFunction) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);
    this.originalMethods.set(methodName, module[methodName]);
    module[methodName] = implementation;
  }

  public restoreMethod(methodName: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    if(this.originalMethods.has(methodName)) {
      module[methodName] = this.originalMethods.get(methodName);
      this.originalMethods.delete(methodName);
    }
  }

  public restoreAll() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    for (const [methodName, originalMethod] of this.originalMethods.entries()) {
      module[methodName] = originalMethod;
    }

    this.originalMethods.clear();
  }
}
