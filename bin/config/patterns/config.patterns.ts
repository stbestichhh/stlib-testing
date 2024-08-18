export const patterns = {
  ts: `import { StestConfig } from "@stlib/testing";

const config: StestConfig = {
  pattern: 'test/**/*.{spec,test}.ts',
  ignore: ['node_modules'],
};
export default config;
`,
  js: `const config = {
  pattern: 'test/**/*.{spec,test}.ts',
  ignore: ['node_modules'],
};
module.exports = config;
`,
  json: `{
  "pattern": "test/**/*.{spec,test}.ts",
  "ignore": ["node_modules"]
}`,
  yml: `pattern: "test/**/*.{spec,test}.ts"
ignore:
  - node_modules`,
};
