/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: 'test/.*\\.(test|spec).(ts|js)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

module.exports = config;
