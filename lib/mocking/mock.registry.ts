import { Mock } from './mockClass';
import { MockModule } from './mockModule';
import { MockFn } from './mockFunction';

type MockTypes = Mock<any> | MockModule | MockFn;

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
