import { assertThat, Test, Case, MockModule } from '@stlib/testing';

@Test('Mock Module Tests')
class MockModuleTests {

  @Case('Should mock module method')
  checkMockModuleMethod() {
    const mockModule = new MockModule('fs');
    mockModule.mockMethod('readFileSync', () => 'mocked content');

    const fs = require('fs');
    const content = fs.readFileSync('/path/to/file');

    assertThat(content).toBe('mocked content');
    mockModule.restoreAll(); //! do not forget to restore module before mocking it again!
  }

  @Case('Should restore module method')
  checkRestoreModuleMethod() {
    const mockModule = new MockModule('fs');
    mockModule.mockMethod('readFileSync', () => 'mocked content');

    mockModule.restoreMethod('readFileSync');
    const fs = require('fs');
    const content = fs.readFileSync('/path/to/file');

    assertThat(content).toNotEqual('mocked content');
  }
}
