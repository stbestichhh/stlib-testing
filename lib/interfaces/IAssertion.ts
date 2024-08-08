export interface IAssertion {
  toEqual(expected: any): IAssertion;
  toNotEqual(expected: any): IAssertion;
  toStrictEqual(expected: any): IAssertion;
  toStrictNotEqual(expected: any): IAssertion;
  toBe(expected: any): IAssertion;
  toBeTruthy(): IAssertion;
  toBeFalsy(): IAssertion;
  toBeGreaterThan(expected: number): IAssertion;
  toBeGreaterThanOrEqual(expected: number): IAssertion;
  toBeLessThan(expected: number): IAssertion;
  toBeLessThanOrEqual(expected: number): IAssertion;
  toBeDefined(): IAssertion;
  toBeUndefined(): IAssertion;
  toBeNull(): IAssertion;
  toBeNotNull(): IAssertion;
  toBeTypeOf(type: any): IAssertion;
  toHaveProperty(property: any): IAssertion;
  toThrow(error?: ErrorConstructor): IAssertion;
  toNotThrow(): IAssertion;
}
