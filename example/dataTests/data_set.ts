import { assertThat, Case, Test, DataSet } from "@stlib/testing";

@Test()
class DataSetExample {

  @Case()
  @DataSet([1, 2, 3], [2, 3, 5], [3, 5, 8])
  testAddition(a: number, b: number, expected: number) {
    const result = a + b;
    assertThat(result).toEqual(expected);
  }
}
