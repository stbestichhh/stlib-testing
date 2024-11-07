import { AnyFunction } from '../types';

export class Spy {
  private originalFunction: AnyFunction;
  private callCount: number = 0;
  private callArgs: any[][] = [];
  private callResults: any[] = [];
  private callOrder: number[] = [];
  private thrownExceptions: any[] = [];
  private readonly context: any;

  constructor(originalFunction: AnyFunction, context: any = null) {
    this.originalFunction = originalFunction;
    this.context = context;
  }

  get spyFn() {
    return this.spyWrapper.bind(this);
  }

  private spyWrapper(...args: any[]) {
    this.callCount++;
    this.callOrder.push(this.callCount);
    this.callArgs.push(args);

    try {
      const result = this.originalFunction.apply(this.context, args);

      if (result instanceof Promise) {
        this.callResults.push('Promise<Pending>');
        const index = this.callResults.indexOf('Promise<Pending>');
        result.then((resolvedValue) => {
          if (index > -1) this.callResults[index] = resolvedValue;
        }).catch((e) => {
          if (index > -1) this.callResults[index] = e;
          this.thrownExceptions.push(e);
        })
      } else {
        this.callResults.push(result);
      }

      return result;
    } catch (e) {
      this.thrownExceptions.push(e);
      throw e;
    }
  }

  public getCallCount() {
    return this.callCount;
  }

  public getCallOrder() {
    return this.callOrder;
  }

  public getCallResults(callIndex?: number) {
    return callIndex ? this.callResults[callIndex] : this.callResults;
  }

  public getCallArgs(callIndex?: number) {
    return callIndex ? this.callArgs[callIndex] : this.callArgs;
  }

  public getThrownErrors(callIndex?: number) {
    return callIndex ? this.thrownExceptions[callIndex] : this.thrownExceptions;
  }

  public wasCalled(amount?: number) {
    return amount ? this.callCount > amount : this.callCount > 0;
  }

  public wasCalledWith(...args: any[]) {
    return this.callArgs.some((callArgs) => this.compareArgs(callArgs, args));
  }

  public call(...args: any[]) {
    this.spyWrapper(...args);
  }

  private compareArgs(args1: any[], args2: any[]) {
    return JSON.stringify(args1) === JSON.stringify(args2);
  }
}
