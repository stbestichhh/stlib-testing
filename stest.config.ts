import { StestConfig } from "@stlib/testing";

const config: StestConfig = {
  pattern: 'test/**/*.{spec,test}.ts',
  ignore: ['node_modules'],
  autoClearMocks: true,
  cacheWatcher: false,
};
export default config;
