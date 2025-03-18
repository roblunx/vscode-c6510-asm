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
 * Go to references of
   * variable
   * constant
   * label
   * macro
   * macro parameter
   * instructions
 * Commands for
   * Build current file
   * Build and Run current file
 * Completion and hover support for embedded Lua and Squirrel scripts

## Requirements

Language support like syntax highlighting of the embedded script languages Lua and Squirrel
require installation of separate extensions for those.

## Settings

The following settings are available for the extension. They are organized under the `C6510` header.
 * **Build File**: Name of the file describing how to build the source in the directory of the currently
   open file. This file also specifies paths to search for included files when looking for definitions/references.
 * **Assembler &raquo; Executable Path**: Path to the c6510 binary. Unless specified it is expected to be found in the
   default search path.
 * **Assembler &raquo; Clear Previous Output**: When enabled this will clear the output from previous run every time.
 * **Assembler &raquo; Include Paths**: An array of strings specifying global include search paths, i.e. directories
   that are always considered when reading included source files while searching for definitions in
   `Go to definition`. E.g. the directory with the c6510 provided include files.
 * **Assembler &raquo; Option &raquo; Output File**: Specifies the name and optionally path of the resulting output PRG file.
 * **Assembler &raquo; Option &raquo; Symbol file**: Specifies the name and optionally path of a symbol file in VICE format
   resulting from building the source files.
 * **Assembler &raquo; Option &raquo; Additional Sources**: Array of strings of paths of additional implicit source files
   to be processed before the current source file is processed.
 * **Assembler &raquo; Option &raquo; Preset Defines**: Array of strings of additional implicit constant definitions before
   the source files are processed.
 * **Assembler &raquo; Option &raquo; Command Line**: Command line used to invoke assembler. The following placeholder
   variables may be used.
   * `${executablePath}` - path to the c6510 executable.
   * `${includes}` - list of all specified include paths, each prepended with proper command line option.
   * `${presets}` - list of all specified preset definitions, each prepended with proper command line option.
   * `${additionals}` - list of all specified additional source files, to process before the current text document,
     each prepended with proper command line option.
   * `${symbolPath}` - path to the symbol file.
   * `${outputPath}` - path to the target output PRG file.
   * `${sourceFile}` - file name of the current text document.
 * **Emulator &raquo; Command Line**: Command line used to invoke emulator. The following placeholder variables may be used:
   * `${symbolPath}` - path to the symbol file.
   * `${outputPath}` - path to the target output PRG file.

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

### 1.2.1
 - Issue with `web-tree-sitter` manifested during debugging of extension causing the activation of the
   extension to fail. Updated `web-tree-sitter` node module to a slightly newer version which contains a fix.
 - Command line wrapping approach on macOS using `script` fails on newer OS versions and has now been
   replaced with another using `expect` instead. The wrapping makes the emulator run in a pty in order
   to get unbuffered output.

### 1.2.0

 - Added `Go to references` support.
 - Corrected opcode hover info.
 - Fixed loading of embedded script language extensions (in a hacky way).
 - Fixed incorrect scope limits where auto-named labels where treated as global when they should be ignored.
 - Limit search for local names inside macro to macro body.

### 1.1.0

 - Added symbol file placeholder variable to Build And Run Current command.

### 1.0.0

 - First public release.

### 0.0.11

 - Added completion and hover support for Lua and Squirrel scripts.
 - Fixed build (and run) commands so they now appear in command palette as expected.
 - Updated parser to support new features (`virtual` and `error`) added to c6510.
 - Changed the composition of the build command line to now use a configurable string with
   placeholder variables.

### 0.0.10

 - Updated parser to support new operators added to c6510.

### 0.0.9

 - Added documentation of configuration properties in readme file.
 - Fixed broken include path conf following changes when added build (and run) commands.

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

