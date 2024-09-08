import { AnyFunction } from '../types';

export class Spy {
  private originalFunction: AnyFunction;
  private context: any;
  private callCount: number = 0;
  private callArgs: any[][] = [];
  private callResults: any[] = [];
  private callOrder: number[] = [];
  private thrownExceptions: any[] = [];

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
      this.callResults.push(result);
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
    return this.callCount > amount || 0;
  }

  public wasCalledWith(...args: any[]) {
    return this.callArgs.some((callArgs) => this.compareArgs(callArgs, args));
  }

  private compareArgs(args1: any[], args2: any[]) {
    return JSON.stringify(args1) === JSON.stringify(args2);
  }
}
