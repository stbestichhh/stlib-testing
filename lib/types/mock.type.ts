import { Mock, MockFn, MockModule } from '../mocking';
import { SpyMock } from './spy';

export type MockTypes = Mock<any> | MockModule | MockFn | SpyMock;
