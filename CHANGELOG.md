# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Patch 1.2.1
Full changelog [here](https://github.com/stbestichhh/stlib-testing/pull/94)

## Update 1.2.0
### Added:
* New assertions. See [assertions API](README.md#assertions-api)
* New spy method `call(...args: any[])`, which allows to run function with spying it 

### Fix:
* Fixed error on wrong keybinding pressed
* Updated module cache deleting. If function were changed, watch mode reruns tests for new implementation

## Update 1.1.0
### Added:
* Snapshot testing
* Time log
* Small watch mode improvement

## Patch 1.0.7
### Added:
* HTML reporting as optional feature

## Patch 1.0.6
### Updated:
* New command line interface

### Fixed:
* Config initialization error, when choosing wrong file extension
* Not working `cacheWatcher` option in configuration file

### Other:
* Provided some optimisation

## Patch 1.0.5
### Fixed:
* Missing package contents
* Watch mode exiting process

### Updated:
* Now `wasCalled` spy function can accept custom calls amount. See [usage](README.md#spy-api) for more information.

## Patch 1.0.4
### Added:
* Data decorators for tests
* Optimized mocks registry and test running
* Spy functionality
* Timeout for tests

### Changed:
* Optimized test registry
* Optimized mock registry

## Patch 1.0.3
### Added:
* Now test cases can be asynchronous
* toNotBe assertion
* Optimisation for better performance
* Hotkeys for watch mode

#### Security Updates:
* Updated `micromatch` from 4.0.7 to 4.0.8

## Patch 1.0.2
### Added:
* Caching option in config for watch mode. Now it can be disabled
* Auto clear mocks & restore all mocks function

### Updated:
* Watch mode output

### Fix:
* Watch mode events running
* Error while running tests after unlink event

## Patch 1.0.1
### Updated:
* Now watch mode runs only new or changed tests

### Fixed:
* Multiple running tests when started watch mode
* Not formatted error output in watch mode

## Version 1.0.0
### Added:
* Watch mode
* Lifecycle decorators 
* --config flag to define custom config file path
* New config file formats: .js and .ts
* --init flag for initializing config file

### Fixed:
* Fixed toBeFalsy() assertion
* Fixed mocking api docs 

## Patch 0.0.6
### Added:
* Mocking functionality
* Yaml parser for config. Now configurations can be written using both formats, `yaml` and `json`.
* New 11 assertion methods. See [usage](README.md#api)

#### Other:
* Added assertion interfaces to the package types`

## Patch 0.0.5
### Added:
* Configuration file

### Changed:
* More secure process exiting for Windows
* More minimalistic and beautiful output

## Patch 0.0.4
### Added:
* Provided new functionality to methods: toThrow, toNotThrow. See [usage](README.md#api)
* Now process is exiting with code 1 if any of the tests failed

### Fixed:
* Fixed status badge color

## Patch 0.0.3
### Fixed:
* Fixed types

## Patch 0.0.2
### Added:
* New methods: toNotEqual and ToStrictNotEqual
* New beautiful and more informed output  
* Added chaining

### Changed:
* Defining tests now easier

## Version 0.0.1
* Full changelog see [here](https://github.com/stbestichhh/stlib-testing/commits/0a7c4417cc1c23384bd07bc488d567342b65e96e/).
