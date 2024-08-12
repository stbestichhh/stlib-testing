import { IAssertion } from '../interfaces';
import { AssertionException } from '../exceptions';

export function assertThat(actual: any): IAssertion {
  function assertFunction() {
    if (typeof actual !== 'function') {
      throw new AssertionException(`Expected ${actual} to be a function`);
    }
  }

  return {
    toEqual(expected: any) {
      if (actual != expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toNotEqual(expected: any) {
      if (actual == expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to not equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toStrictEqual(expected: any) {
      if (actual !== expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toStrictNotEqual(expected: any) {
      if (actual === expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to strictly not equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBe(expected: any) {
      if (actual != expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeTruthy() {
      if (!actual) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be truthy`,
        );
      }

      return this;
    },

    toBeFalsy() {
      if (!actual) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be falsy`,
        );
      }

      return this;
    },

    toBeGreaterThan(expected: number) {
      if (actual <= expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be greater than ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeGreaterThanOrEqual(expected: number) {
      if (actual < expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be greater than or equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeLessThan(expected: number) {
      if (actual >= expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be less than ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeLessThanOrEqual(expected: number) {
      if (actual > expected) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be less than or equal ${JSON.stringify(expected)}`,
        );
      }

      return this;
    },

    toBeDefined() {
      if (actual === undefined) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be defined`,
        );
      }

      return this;
    },

    toBeUndefined() {
      if (actual !== undefined) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be undefined`,
        );
      }

      return this;
    },

    toBeNull() {
      if (actual !== null) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be null`,
        );
      }

      return this;
    },

    toBeNotNull() {
      if (actual === null) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to be not null`,
        );
      }

      return this;
    },

    toBeTypeOf(type: any | string) {
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

    toHaveProperty(property: any) {
      if (!Object.hasOwn(actual, property)) {
        throw new AssertionException(
          `Expected ${JSON.stringify(actual)} to has own property ${JSON.stringify(property)}`,
        );
      }

      return this;
    },

    toThrow(expectedError?: ErrorConstructor, ...args: any[]) {
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

    toNotThrow(expectedError?: ErrorConstructor, ...args: any[]) {
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
  };
}
