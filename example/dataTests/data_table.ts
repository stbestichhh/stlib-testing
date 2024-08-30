import { assertThat, Case, Test, DataTable } from "@stlib/testing";

@Test()
class DataSetExample {

  @Case()
  @DataTable([
    { inputs: [1, 2], expected: 3 },
    { inputs: [2, 3], expected: 5 },
    { inputs: [3, 5], expected: 8 },
  ])
  testAddition(a: number, b: number, expected: number) {
    const result = a + b;
    assertThat(result).toEqual(expected);
  }
}
