import { assertThat, Test, Case } from '@stlib/testing';

@Test('Basic Assertions')
class BasicAssertions {

  @Case('Should satisfy predicate')
  checkSatisfyPredicate() {
    assertThat(5).toSatisfy(value => value > 0);
  }
}
