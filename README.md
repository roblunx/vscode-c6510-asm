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

The embedded language Squirrel's specification treat `#` as the start of a line comment which
conflicts with c6510 variables used in the scripts since they are prefixed with `##`.

## Release Notes

### 0.0.2

- Added icon by Markus Klein (LMan).
- Added missing Squirrel support (semi-working)

### 0.0.1

- Initial pre-release

