# c6510-asm

A Visual Studio Code extension that provides language support for C64 development using the c6510 Assembler.

## Features

 * Syntax highlighting
 * Hovering shows information about
   * Instruction Set - including _illegal_ instructions
     * Addressing modes
     * Affected status flags
     * Byte count
     * Cycle count
   * Known addresses
     * VIC
     * SID
     * CIA1
     * CIA2
   * Number representations
     * Decimal
     * Hexadecimal
     * Binary
 * Go to definition of
   * variable
   * constant
   * label
   * macro
   * macro parameter
 * Commands for
   * Build current file
   * Build and Run current file

## Requirements

Language support like syntax highlighting of the embedded script languages Lua and Squirrel
require installation of separate extensions for those.

## Settings

The following settings are available for the extension. They are organized under the `C6510` header.
 * **Build File**: Specifies the name of a build file.
 * **Include Paths**: An array of strings specifying global include search paths, i.e. directories
   that are always considered when reading included source files while searching for definitions in
   `Go to definition`.

## Build file

This is a JSON file currently only used to specify include search paths. It is read when a
`Go to definition` is requested within a source file in the same directory. The include search paths
specified within it will be temporarily added to the list of directories that are searched for included files.
Both when processing the current source file and any source file included.

The paths to the directories can be absolute or relative. Relative paths are relative the
location of the build file itself.

Example file `build.json`:

    {
        "includePaths": [ "/foo/bar", "baz" ]
    }

## Known Issues

There is a known limitation for embedded Lua scripts that require the ending curly bracket to be
alone on an empty line.

## Credits

- Icon by Markus Klein (LMan)
- Embedded Squirrel script syntax highlighting based on grammar file from VS Code Extension [marcinbar.vscode-squirrel](https://bitbucket.org/marcinbar91/vscode-squirrel/src/master/)
- Memory reference information from [Joe Forster/STA](http://sta.c64.org/cbm64mem.html)
- OpCode reference information from [mass:werk](https://www.masswerk.at/6502/6502_instruction_set.html) (Original author unknown).
- Illegal Opcode reference information originally from [this](http://members.chello.nl/taf.offenga/illopc31.txt) document by Freddy Offenga. The web page is not available anymore but can be found on [Internet Archive / Wayback Machine](https://archive.org/web/).

## Release Notes

### 0.0.8

 - Added command to build current source file.
 - Added command to build and run current source file.

### 0.0.7

 - Fixed searching for local variable definition, only local labels were handled.
 - Fixed searching for local names up the syntax tree. Previously only labels at the same
   level in the syntax tree were considered.

### 0.0.6

 - Fixed unnecessary processing multiple times of the same file when included from different sources. 
 - Prevented failure and never reaching a result due to recursive or cross inclusion.

### 0.0.5

 - Added multi-file support for `Go to definition`. Source files included are now also searched.
 - Added support for build file, currently only for specifying local include directories.
 - Added configuration parameters to specify build file name and global include directories.

### 0.0.4

- Added `Go to definition` support in the same file
- Fixed missing syntax highlight of local labels

### 0.0.3

- Added and adapted Squirrel grammar file from VS Code Extension [marcinbar.vscode-squirrel](https://bitbucket.org/marcinbar91/vscode-squirrel/src/master/)
  - Uses embedded language id and scope `c6510-sq` so it wont be used for normal Squirrel files
  - Added support for c6510 variable references within the script
- Added missing `vice` keyword

### 0.0.2

- Added icon by Markus Klein (LMan).
- Added missing Squirrel support (semi-working)

### 0.0.1

- Initial pre-release

