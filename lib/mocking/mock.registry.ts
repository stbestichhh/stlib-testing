import { MockFn } from './mockFunction';
import { MockTypes } from '../types';

export class MockRegistry {
  private static activeMocks: MockTypes[] = [];

  public static registerMock(mock: MockTypes) {
    this.activeMocks.push(mock);
  }

  public static restoreAll() {
    this.activeMocks.forEach((mock: MockTypes) => {
      mock instanceof MockFn ? mock.restore() : mock.restoreAll();
    });
  }
}
