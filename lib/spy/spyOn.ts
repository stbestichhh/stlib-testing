import { Spy } from './spy';
import { MockRegistry } from '../mocking';

export function spyOn(object: any, methodName?: string) {
  const isFunctionSpy = typeof object === 'function' && !methodName;

  const originalMethod = isFunctionSpy ? object : object[methodName!];
  const spy = new Spy(originalMethod, isFunctionSpy ? null : object);

  if (isFunctionSpy) {
    object = spy.spyFn;
    MockRegistry.registerMock({
      restoreAll: () => {
        object = originalMethod;
      },
    });
  } else {
    object[methodName!] = spy.spyFn;
    MockRegistry.registerMock({
      restoreAll: () => {
        object[methodName!] = originalMethod;
      },
    });
  }

  return spy;
}
