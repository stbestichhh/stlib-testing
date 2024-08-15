import { AnyFunction } from '../types';

export class MockModule {
  private originalModules: Map<string, any>;

  constructor(private moduleName: string) {
    this.originalModules = new Map<string, any>();
  }

  public mockMethod(methodName: string, implementation: AnyFunction) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);
    this.originalModules.set(methodName, module[methodName]);
    module[methodName] = implementation;
  }

  public restoreMethod(methodName: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    if(this.originalModules.has(methodName)) {
      module[methodName] = this.originalModules.get(methodName);
      this.originalModules.delete(methodName);
    }
  }

  public restoreAll() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(this.moduleName);

    for (const [methodName, originalMethod] of this.originalModules.entries()) {
      module[methodName] = originalMethod;
    }

    this.originalModules.clear();
  }
}
