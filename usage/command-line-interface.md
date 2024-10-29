---
description: How to use sTest command line interface
---

# Command Line Interface

To run tests, use [**node package executer**](https://www.npmjs.com/package/npx)**:**

```bash
npx stest
```

## Options

**Config:** sets  custom path to the config file. For more about config, see [Configuration](configuration.md) under Usage section.

Example:

```shell
npx stest --config ./.configs/stest.config.e2e.ts
```

* **Initialise:** creates new config file in your project directory.

Values:&#x20;

* empty value - creates config file in `JSON` extension
* ts - creates `TypeScript` config file
* js - creates `JavaScript` config file
* json - creates config file in `JSON` extension
* yml - creates config file in `YAML` extension

Example:

```bash
npx stest --init yml
```

* **Watch mode:** runs tests in watch mode. For more about watch mode, see [Usage section](watch-mode.md).

Example:

```bash
npx stest --watch
```
