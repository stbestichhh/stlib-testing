export const patterns: { [k: string]: string } = {
  ts: `import { StestConfig } from "@stlib/testing";

const config: StestConfig = {
  pattern: 'test/**/*.{spec,test}.ts',
  ignore: ['node_modules'],
  autoClearMocks: true,
  cacheWatcher: false,
  enableReporting: false,
};
export default config;
`,
  js: `const config = {
  pattern: 'test/**/*.{spec,test}.ts',
  ignore: ['node_modules'],
  autoClearMocks: true,
  cacheWatcher: false,
  enableReporting: false,
};
module.exports = config;
`,
  json: `{
  "pattern": "test/**/*.{spec,test}.ts",
  "ignore": ["node_modules"],
  "autoClearMocks": true,
  "cacheWatcher": false,
  "enableReporting": false
}`,
  yml: `pattern: "test/**/*.{spec,test}.ts"
ignore:
  - node_modules
autoClearMocks: true,
cacheWatcher: false
enableReporting: false`,
};
