# Change Log

All notable changes to the "c6510-asm" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.2.0] - 2023-07-25
### Added
- `Go to references` support.

### Fixed
- Corrected opcode hover info.
- Loading of embedded script language extensions (in a hacky way).
- Incorrect scope limits where auto-named labels where treated as global when they should be ignored.
- Limit search for local names inside macro to macro body.

## [1.1.0] - 2022-07-12
### Added
- Symbol file placeholder variable to Build And Run Current command.

## [1.0.0] - 2022-07-05
### Fixed
- Bumping version for first public release.

## [0.0.11] - 2022-07-05
### Added
- Completion and hover support for Lua and Squirrel scripts.

### Fixed
- Build (and run) commands now appear in command palette as expected.
- Updated parser to support new features (`virtual` and `error`) added to c6510.

### Changed
- The composition of the build command line is now a configurable string with placeholder variables.

## [0.0.10] - 2022-04-16
### Fixed
- Updated parser to support new operators (`+=`, `*=`, etc) added to c6510.

## [0.0.9] - 2022-03-26
### Added
- Documentation of configuration properties in readme file.

### Fixed
- Broken include path conf following changes when added build (and run) commands.

## [0.0.8] - 2022-03-10
### Added
- Command to build current source file.
- Command to build and run current source file.

## [0.0.7] - 2022-01-19
### Fixed
- Searching for local variable definition, only local labels were handled.
- Searching for local names up the syntax tree. Previously only labels at the same
  level in the syntax tree were considered.

## [0.0.6] - 2021-12-21
### Fixed
- Unnecessary processing multiple times of the same file when included from different sources. 
- Preventing failure and never reaching a result due to recursive or cross inclusion.

## [0.0.5] - 2021-12-10
### Added
- Multi-file support for `Go to definition`. Source files included are now also searched.
- Support for build file, currently only for specifying local include directories.
- Configuration parameters to specify build file name and global include directories.

## [0.0.4] - 2021-10-26
### Added
- `Go to definition` support in the same file

### Fixed
- Missing syntax highlight of local labels

## [0.0.3] - 2021-08-26
### Added
- Adapted Squirrel grammar file from VS Code Extension [marcinbar.vscode-squirrel](https://bitbucket.org/marcinbar91/vscode-squirrel/src/master/)
  - Uses embedded language id and scope `c6510-sq` so it wont be used for normal Squirrel files
  - Added support for c6510 variable references within the script
- Added missing `vice` keyword

## [0.0.2] - 2021-08-24
### Added
- Icon by Markus Klein (LMan)
- Missing Squirrel support (semi-working)

## [0.0.1] - 2021-08-13
### Added
- Initial pre-release
