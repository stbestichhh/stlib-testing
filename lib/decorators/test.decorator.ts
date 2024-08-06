import { TestRegistry } from '../../bin/testRegistry';

export function Test(testName: string): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    TestRegistry.push({ testName, target: constructor });
  };
}
