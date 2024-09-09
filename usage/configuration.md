---
description: How to configure sTest
---

# Configuration

Configuration file for sTest can be writen using four different file extension. It is: JSON, YAML, TypeScript and JavaScript. Name for the configuration file has to be: `stest.config.{extension}`

## Config Options

**pattern -** defines path and test files name patterns. By default is: `test/**/*.{spec,test}.ts`. This pattern looks for `test` directory in your project base directory, and finds there all files, which name contains `.spec.ts` or `.test.ts`

**ignore -** defines an array with path patterns, which have to be ignored and not looked for tests. Useful for reducing time needed to find and load test files. Be default is: `["node_modules"]`

**autoClearMocks -** using this options, auto clearing mocks can be disabled or enabled. By default option is `enabled`. Mocks are cleared after each tests and are deleted after all tests which were in the test file.

**cacheWatcher -** enables or disables caching test results. If enabled, watch mode will rerun only those test files, which have been added to your project or changed. If disabled, it will always run all test files

## Config files examples

**TypeScript:**

{% code title="stest.config.ts" %}
```typescript
import { StestConfig } from "@stlib/testing";

const config: StestConfig = {
  pattern: "test/**/*.{spec,test}.ts",
  ignore: ["node_modules", "lib"],
  autoClearMocks: true,
  cacheWatcher: false,
};
export default config;
```
{% endcode %}

**JavaScript**

{% code title="stest.config.js" %}
```javascript
const config = {
  pattern: "test/**/*.{spec,test}.ts",
  ignore: ["node_modules", "lib"],
  autoClearMocks: true,
  cacheWatcher: false,
};
module.exports = config
```
{% endcode %}

**JSON**

{% code title="stest.config.json" %}
```json
{
  "pattern": "test/**/*.{spec,test}.ts",
  "ignore": ["node_modules", "lib"],
  "autoClearMocks": true,
  "cacheWatcher": false
}
```
{% endcode %}

**YAML**

{% code title="stest.config.yml" %}
```yaml
pattern: "test/**/*.{spec,test}.ts"
ignore:
  - node_modules
  - lib
autoClearMocks: true
cacheWatcher: false
```
{% endcode %}
