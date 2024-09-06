// Assertions
interface IAssertion
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

interface IEqualityAssertion {
  toEqual(expected: any): IAssertion;
  toNotEqual(expected: any): IAssertion;
  toStrictEqual(expected: any): IAssertion;
  toStrictNotEqual(expected: any): IAssertion;
  toBe(expected: any): IAssertion;
}

interface ITruthinessAssertion {
  toBeTruthy(): IAssertion;
  toBeFalsy(): IAssertion;
}

interface IComparisonAssertion {
  toBeGreaterThan(expected: number): IAssertion;
  toBeGreaterThanOrEqual(expected: number): IAssertion;
  toBeLessThan(expected: number): IAssertion;
  toBeLessThanOrEqual(expected: number): IAssertion;
}

interface ITypeAssertion {
  toBeDefined(): IAssertion;
  toBeUndefined(): IAssertion;
  toBeNull(): IAssertion;
  toBeNotNull(): IAssertion;
  toBeNaN(): IAssertion;
  toBeFinite(): IAssertion;
  toBeTypeOf(type: any): IAssertion;
}

interface IPropertyAssertion {
  toHaveProperty(property: any): IAssertion;
  toHaveLength(expected: number): IAssertion;
}

interface IErrorAssertion {
  toThrow(error?: ErrorConstructor, ...args: any[]): IAssertion;
  toNotThrow(error?: ErrorConstructor, ...args: any[]): IAssertion;
}

interface ICollectionAssertion {
  toContain(expected: any): IAssertion;
  toContainEqual(expected: any): IAssertion;
  toIncludeAllMembers(expected: any[]): IAssertion;
  toIncludeAnyMembers(expected: any[]): IAssertion;
}

interface IStringAssertion {
  toMatch(expected: RegExp | string): IAssertion;
  toStartWith(expected: string): IAssertion;
  toEndWith(expected: string): IAssertion;
}

export function assertThat(actual: any): IAssertion;

// Decorators
interface IDataTable {
  readonly inputs: any[];
  readonly expected: any;
}

export function Case(options?: string | { description?: string; timeout?: number }): MethodDecorator;
export function DataSet(...dataSets: any[][]): MethodDecorator;
export function DataTable(dataTable: IDataTable[]): MethodDecorator;
export function Test(testName?: string): ClassDecorator;
export function BeforeAll(description?: string): MethodDecorator;
export function BeforeEach(description?: string): MethodDecorator;
export function AfterAll(description?: string): MethodDecorator;
export function AfterEach(description?: string): MethodDecorator;

// Mocking
type AnyFunction = (...args: any[]) => any;

type MethodNames<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? K : never;
}[keyof T];

type MockTypes = Mock<any> | MockModule | MockFn;

export class MockRegistry {
  public static restoreAll(): void;
}

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

// Spy
class Spy {
  constructor(originalFunction: AnyFunction, context?: any);
  get spyFn(): (...args: any[]) => unknown;
  public getCallCount(): number;
  public getCallOrder(): number[];
  public getCallResults(callIndex?: number): any[];
  public getCallArgs(callIndex?: number): any[][];
  public getThrownErrors(callIndex?: number): any[];
  public wasCalled(): boolean;
  public wasCalledWith(...args: any[]): boolean;
}

export function spyOn(object: any, methodName: string): Spy;

// Config Type
export type StestConfig = {
  pattern?: string;
  ignore?: string[];
  cacheWatcher?: boolean;
  autoClearMocks?: boolean;
};

export {};
