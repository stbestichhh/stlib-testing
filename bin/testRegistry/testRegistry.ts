import { ITestSuite } from '../../lib/interfaces';

export class TestRegistry {
  private static registry: ITestSuite[] = [];

  public static push(test: ITestSuite): number {
    return this.registry.push(test);
  }

  public static get(): ITestSuite[] {
    return this.registry;
  }
}
