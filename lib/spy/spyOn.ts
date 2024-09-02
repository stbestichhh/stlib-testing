import { Spy } from './spy';
import { MockRegistry } from '../mocking';

export function spyOn(object: any, methodName: string) {
  const originalMethod = object[methodName];
  const spy = new Spy(originalMethod, object);

  object[methodName] = spy.spyFn;

  MockRegistry.registerMock({
    restoreAll: () => {
      object[methodName] = originalMethod;
    },
  });

  return spy;
}
