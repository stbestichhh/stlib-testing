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
