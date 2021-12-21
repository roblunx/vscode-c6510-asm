# Change Log

All notable changes to the "c6510-asm" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]
- Multi-file `Go to definition` support

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
