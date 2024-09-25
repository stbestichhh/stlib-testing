import { Case, Test, assertThat, shot } from '@stlib/testing';

@Test()
class SnapshotTestSuite {

  @Case()
  shouldMatchDefaultSnapshot() {
    shot('initialState', 'hello');

    assertThat('hello').toMatchSnapshot();
  }

  @Case()
  shouldMatchMultipleSnapshots() {
    shot('initialState', 'hello');
    shot('updatedState', 'hello again');

    assertThat('hello again').toMatchSnapshot();
  }

  @Case()
  shouldMatchSpecificSnapshot() {
    shot('initialState', 'hello');
    shot('updatedState', 'hello again');

    assertThat('hello').toMatchSnapshot('initialState');
  }
}
