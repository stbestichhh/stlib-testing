import { StestConfig } from "@stlib/testing";

const config: StestConfig = {
  pattern: 'example/**/*.ts',
  ignore: ['node_modules'],
  autoClearMocks: true,
  cacheWatcher: false,
};
export default config;
