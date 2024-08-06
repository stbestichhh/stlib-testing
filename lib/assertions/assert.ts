import { IAssertion } from '../interfaces';
import { AssertionException } from './assertionException';

export function assertThat(actual: any): IAssertion {
  return {
    toEqual(expected: any): void {
      if (actual != expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
      }
    },

    toStrictEqual(expected: any) {
      if (actual !== expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`);
      }
    },

    toBe(expected: any): void {
      if (actual != expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      }
    },

    toBeTruthy(): void {
      if (!actual) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be truthy`);
      }
    },

    toBeFalsy(): void {
      if (!actual) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be falsy`);
      }
    },

    toBeGreaterThan(expected: number): void {
      if (actual <= expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be greater than ${JSON.stringify(expected)}`);
      }
    },

    toBeGreaterThanOrEqual(expected: number) {
      if (actual < expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be greater than or equal ${JSON.stringify(expected)}`);
      }
    },

    toBeLessThan(expected: number): void {
      if (actual >= expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be less than ${JSON.stringify(expected)}`);
      }
    },

    toBeLessThanOrEqual(expected: number) {
      if (actual > expected) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be less than or equal ${JSON.stringify(expected)}`);
      }
    },

    toBeDefined(): void {
      if (actual === undefined) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be defined`);
      }
    },

    toBeUndefined(): void {
      if (actual !== undefined) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be undefined`);
      }
    },

    toBeNull() {
      if (actual !== null) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be null`);
      }
    },

    toBeNotNull() {
      if (actual === null) {
        throw new AssertionException(`Expected ${JSON.stringify(actual)} to be not null`);
      }
    },

    toBeTypeOf(type: any | string) {
      if (typeof type === "string") {
        if (typeof actual !== type) {
          throw new AssertionException(
            `Expected ${JSON.stringify(actual)} to be typeof ${JSON.stringify(type)}`
          );
        }
      } else {
        if (!(actual instanceof type)) {
          throw new AssertionException(
            `Expected ${actual} to be an instance of ${type.name}`
          );
        }
      }
    },

    toHaveProperty(property: any) {
      if (!Object.hasOwn(actual, property)) {
        throw new AssertionException(`Expected ${actual} to has own property ${JSON.stringify(property)}`);
      }
    },

    toThrow(expectedError?: ErrorConstructor) {
      if (typeof actual !== 'function') {
        throw new AssertionException(`Expected ${actual} to be a function`);
      }

      let threw: boolean = false;

      try {
        actual();
      } catch (e: unknown) {
        threw = true;
        if (expectedError && !(e instanceof expectedError)) {
          if (e instanceof Error) {
            throw new AssertionException(`Expected ${actual.name} to throw ${expectedError.name}, but threw ${e.constructor.name}`)
          }
        }
      }

      if (!threw) {
       throw new AssertionException(`Expected ${actual.name} to throw an error`);
      }
    },

    toNotThrow() {
      if (typeof actual !== 'function') {
        throw new AssertionException(`Expected ${actual} to be a function`);
      }

      try {
        actual();
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new AssertionException(`Expected ${actual.name} to not throw an error, but threw ${e.constructor.name}`);
        }
      }
    },
  };
}
