import { IAssertion } from '../interfaces';
import { AssertionException } from '../exceptions';

export function assertThat(actual: any): IAssertion {
  function assertFunction() {
    if (typeof actual !== 'function') {
      throw new AssertionException(`Expected ${actual} to be a function`);
    }
  }

  return {
    toEqual(expected: any): IAssertion {
      if (actual != expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toNotEqual(expected: any): IAssertion {
      if (actual == expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to not equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toStrictEqual(expected: any): IAssertion {
      if (actual !== expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toStrictNotEqual(expected: any): IAssertion {
      if (actual === expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to strictly not equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBe(expected: any): IAssertion {
      if (actual != expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeTruthy(): IAssertion {
      if (!actual) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be truthy`,
        );
      }

      return this;
    },

    toBeFalsy(): IAssertion {
      if (!actual) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be falsy`,
        );
      }

      return this;
    },

    toBeGreaterThan(expected: number): IAssertion {
      if (actual <= expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be greater than ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeGreaterThanOrEqual(expected: number): IAssertion {
      if (actual < expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be greater than or equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeLessThan(expected: number): IAssertion {
      if (actual >= expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be less than ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeLessThanOrEqual(expected: number): IAssertion {
      if (actual > expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be less than or equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeDefined(): IAssertion {
      if (actual === undefined) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be defined`,
        );
      }

      return this;
    },

    toBeUndefined(): IAssertion {
      if (actual !== undefined) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be undefined`,
        );
      }

      return this;
    },

    toBeNull(): IAssertion {
      if (actual !== null) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be null`,
        );
      }

      return this;
    },

    toBeNotNull(): IAssertion {
      if (actual === null) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be not null`,
        );
      }

      return this;
    },

    toBeFinite(): IAssertion {
      if (!Number.isFinite(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be finite number`);
      }

      return this;
    },

    toBeNaN(): IAssertion {
      if (!Number.isNaN(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be NaN`);
      }

      return this;
    },

    toBeTypeOf(type: any | string): IAssertion {
      if (typeof type === 'string') {
        if (typeof actual !== type) {
          throw new AssertionException(
            `Expected ${JSON.stringify(actual)} to be typeof ${JSON.stringify(type)}`,
          );
        }
      } else {
        if (!(actual instanceof type)) {
          throw new AssertionException(
            `Expected ${JSON.stringify(actual)} to be an instance of ${JSON.stringify(type.name)}`,
          );
        }
      }

      return this;
    },

    toHaveProperty(property: any): IAssertion {
      if (!Object.hasOwn(actual, property)) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to has own property ${JSON.stringify(property)}`,
        );
      }

      return this;
    },

    toThrow(expectedError?: ErrorConstructor, ...args: any[]): IAssertion {
      assertFunction();

      let threw: boolean = false;
      try {
        actual(...args);
      } catch (e: unknown) {
        threw = true;

        if (expectedError && !(e instanceof expectedError)) {
          if (e instanceof Error) {
            throw new AssertionException(
              `Expected ${JSON.stringify(actual.name)} to throw ${JSON.stringify(expectedError.name)}, but threw ${JSON.stringify(e.constructor.name)}`,
            );
          }
        }
      }

      if (!threw) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual.name)} to throw an error`,
        );
      }

      return this;
    },

    toNotThrow(expectedError?: ErrorConstructor, ...args: any[]): IAssertion {
      assertFunction();

      try {
        actual(...args);
      } catch (e: unknown) {
        if (expectedError && e instanceof expectedError) {
          throw new AssertionException(
            `Expected ${JSON.stringify(actual.name)} to not throw an error instance of ${JSON.stringify(expectedError.name)}`,
          );
        } else if (expectedError && !(e instanceof expectedError)) {
          return this;
        }

        if (e instanceof Error) {
          throw new AssertionException(
            `Expected ${JSON.stringify(actual.name)} to not throw an error, but threw ${JSON.stringify(e.constructor.name)}`,
          );
        }
      }

      return this;
    },

    toContain(expected: any): IAssertion {
      if (!Array.isArray(actual) && typeof actual !== 'string') {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be an array or string`);
      }

      if (!actual.includes(expected)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(expected)}`);
      }

      return this;
    },

    toContainEqual(expected: any): IAssertion {
      if (!Array.isArray(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be an array`);
      }

      const found = actual.some((item) => JSON.stringify(item) === JSON.stringify(expected));
      if (!found) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to contain an element equal to ${JSON.stringify(expected)}`)
      }

      return this;
    },

    toMatch(expected: RegExp | string): IAssertion {
      if (typeof actual !== 'string') {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be a string`);
      }

      const regexp = typeof expected === 'string' ? new RegExp(expected) : expected;
      if (!regexp.test(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to match ${JSON.stringify(expected)} regular expression`)
      }

      return this;
    },

    toHaveLength(expected: number): IAssertion {
      if (actual.length !== expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to have length ${JSON.stringify(expected)}`);
      }

      return this;
    },

    toStartWith(expected: string): IAssertion {
      if (typeof actual !== 'string' || !actual.startsWith(expected)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to start with ${JSON.stringify(expected)}`);
      }

      return this;
    },

    toEndWith(expected: string): IAssertion {
      if (typeof actual !== 'string' || !actual.endsWith(expected)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to end with ${JSON.stringify(expected)}`);
      }

      return this;
    },

    toSatisfy(predicate: (value: any) => boolean): IAssertion {
      if (!predicate(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to satisfy the predicate`)
      }

      return this;
    },

    toIncludeAllMembers(expected: any[]): IAssertion {
      if (!Array.isArray(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be an array`);
      }

      for(const item of expected) {
        if(!actual.includes(item)) {
          throw new AssertionException(`Expected ${JSON.stringify(actual)} to include all members of ${JSON.stringify(expected)}, but missing ${JSON.stringify(item)}`);
        }
      }

      return this;
    },

    toIncludeAnyMembers(expected: any[]): IAssertion {
      if (!Array.isArray(actual)) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be an array`);
      }

      const found = expected.some((item) => actual.includes(item));

      if (!found) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to include at least one element of ${JSON.stringify(expected)}`);
      }

      return this;
    },
  };
}
