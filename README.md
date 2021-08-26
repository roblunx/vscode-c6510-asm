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

## Requirements

Language support like syntax highlighting of the embedded script languages Lua and Squirrel
require installation of separate extensions for those.

## Known Issues

There is a known limitation for embedded Lua scripts that require the ending curly bracket to be
alone on an empty line.

## Release Notes

### 0.0.3

- Added and adapted Squirrel grammar file from VS Code Extension [marcinbar.vscode-squirrel](https://bitbucket.org/marcinbar91/vscode-squirrel/src/master/)
  - Uses embedded language id and scope `c6510-sq` so it wont be used for normal Squirrel files
  - Added support for c6510 variable references within the script

### 0.0.2

- Added icon by Markus Klein (LMan).
- Added missing Squirrel support (semi-working)

### 0.0.1

- Initial pre-release

