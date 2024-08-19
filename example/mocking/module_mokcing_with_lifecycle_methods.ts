import { assertThat, Test, Case, MockModule, AfterEach, BeforeEach, BeforeAll } from '@stlib/testing';
import path from 'path';
import fs from 'fs';

@Test('Mock Module Tests')
class MockModuleTests {
  private mockModule: MockModule = new MockModule('fs');

  @BeforeAll()
  createModuleMock() {
    this.mockModule.mockMethod('readFileSync', () => 'mocked content');
  }

  @AfterEach()
  clearMocks() {
    this.mockModule.restoreAll();
  }

  @Case('Should mock module method')
  checkMockModuleMethod() {
    const content = fs.readFileSync('/path/to/file');

    assertThat(content).toBe('mocked content');
  }

  @Case('Should restore module method')
  checkRestoreModuleMethod() {
    const content = fs.readFileSync(path.resolve(__dirname, '../../stest.config.ts'));

    assertThat(content).toNotEqual('mocked content');
  }
}
