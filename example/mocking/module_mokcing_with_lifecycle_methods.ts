import { assertThat, Test, Case, MockModule, AfterEach, AfterAll, BeforeAll, MockRegistry } from '@stlib/testing';
import path from 'path';
import fs from 'fs';

@Test('Mock Module Tests with lifecycle methods')
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

  @AfterAll()
  clearAllMocksFromAllTestFiles() {
    MockRegistry.restoreAll();
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
