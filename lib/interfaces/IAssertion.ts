export interface IAssertion {
  toEqual(expected: any): void;
  toStrictEqual(expected: any): void;
  toBe(expected: any): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toBeLessThan(expected: number): void;
  toBeLessThanOrEqual(expected: number): void;
  toBeDefined(): void;
  toBeUndefined(): void;
  toBeNull(): void;
  toBeNotNull(): void;
  toBeTypeOf(type: any): void;
  toHaveProperty(property: any): void;
}
