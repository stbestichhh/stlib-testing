// Assertions

export interface IAssertion
  extends IEqualityAssertion,
    ITruthinessAssertion,
    IComparisonAssertion,
    ITypeAssertion,
    IPropertyAssertion,
    IErrorAssertion,
    ICollectionAssertion,
    IStringAssertion {
  toSatisfy(predicate: (value: any) => boolean): IAssertion;
}

export interface IEqualityAssertion {
  toEqual(expected: any): IAssertion;
  toNotEqual(expected: any): IAssertion;
  toStrictEqual(expected: any): IAssertion;
  toStrictNotEqual(expected: any): IAssertion;
  toBe(expected: any): IAssertion;
}

export interface ITruthinessAssertion {
  toBeTruthy(): IAssertion;
  toBeFalsy(): IAssertion;
}

export interface IComparisonAssertion {
  toBeGreaterThan(expected: number): IAssertion;
  toBeGreaterThanOrEqual(expected: number): IAssertion;
  toBeLessThan(expected: number): IAssertion;
  toBeLessThanOrEqual(expected: number): IAssertion;
}

export interface ITypeAssertion {
  toBeDefined(): IAssertion;
  toBeUndefined(): IAssertion;
  toBeNull(): IAssertion;
  toBeNotNull(): IAssertion;
  toBeNaN(): IAssertion;
  toBeFinite(): IAssertion;
  toBeTypeOf(type: any): IAssertion;
}

export interface IPropertyAssertion {
  toHaveProperty(property: any): IAssertion;
  toHaveLength(expected: number): IAssertion;
}

export interface IErrorAssertion {
  toThrow(error?: ErrorConstructor, ...args: any[]): IAssertion;
  toNotThrow(error?: ErrorConstructor, ...args: any[]): IAssertion;
}

export interface ICollectionAssertion {
  toContain(expected: any): IAssertion;
  toContainEqual(expected: any): IAssertion;
  toIncludeAllMembers(expected: any[]): IAssertion;
  toIncludeAnyMembers(expected: any[]): IAssertion;
}

export interface IStringAssertion {
  toMatch(expected: RegExp | string): IAssertion;
  toStartWith(expected: string): IAssertion;
  toEndWith(expected: string): IAssertion;
}

export function Case(caseDescription?: string): MethodDecorator;
export function Test(testName?: string): ClassDecorator;
export function assertThat(actual: any): IAssertion;

// Mocking

export type AnyFunction = (...args: any[]) => any;

export type MethodNames<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? K : never;
}[keyof T];

export class Mock<T> {
  constructor(target: T);
  public mockMethod<K extends MethodNames<T> & string>(
    methodName: K,
    implementation: AnyFunction,
  ): void;
  public verifyCalled<K extends MethodNames<T> & string>(
    methodName: K,
    expectedCallCount: number,
  ): void;
  public verifyCalledWith<K extends MethodNames<T> & string>(
    methodName: K,
    expectedArgs: any[],
  ): void;
  public restoreMethod<K extends MethodNames<T> & string>(methodName: K): void;
  public restoreAll(): void;
}

export class MockFn {
  constructor(fn: AnyFunction, implementation?: AnyFunction);
  public mock(implementation: AnyFunction): void;
  public verifyCalled(expectedCallCount: number): void;
  public verifyCalledWith(expectedArgs: any[]): void;
  public restore(): void;
  public getFunction(): AnyFunction;
  public call(...args: any[]): any;
}

export class MockModule {
  constructor(moduleName: string);
  public mockMethod(methodName: string, implementation: AnyFunction): void;
  public verifyCalled(methodName: string, expectedCallCount: number): void;
  public verifyCalledWith(methodName: string, expectedArgs: any[]): void;
  public restoreMethod(methodName: string): void;
  public restoreAll(): void;
}
