
export let vicregs:any = {
"$d000": "Sprite #0 X-coordinate (only bits #0-#7).",
"$d001": "Sprite #0 Y-coordinate.",
"$d002": "Sprite #1 X-coordinate (only bits #0-#7).",
"$d003": "Sprite #1 Y-coordinate.",
"$d004": "Sprite #2 X-coordinate (only bits #0-#7).",
"$d005": "Sprite #2 Y-coordinate.",
"$d006": "Sprite #3 X-coordinate (only bits #0-#7).",
"$d007": "Sprite #3 Y-coordinate.",
"$d008": "Sprite #4 X-coordinate (only bits #0-#7).",
"$d009": "Sprite #4 Y-coordinate.",
"$d00a": "Sprite #5 X-coordinate (only bits #0-#7).",
"$d00b": "Sprite #5 Y-coordinate.",
"$d00c": "Sprite #6 X-coordinate (only bits #0-#7).",
"$d00d": "Sprite #6 Y-coordinate.",
"$d00e": "Sprite #7 X-coordinate (only bits #0-#7).",
"$d00f": "Sprite #7 Y-coordinate.",
"$d010": "Sprite #0-#7 X-coordinates (bit #8). Bits:\n" +
         " * Bit #x: Sprite #x X-coordinate bit #8.\n",

"$d011": "Screen control register #1. Bits:\n" +
         " * Bits #0-#2: Vertical raster scroll.\n" +
         " * Bit #3: Screen height; 0 = 24 rows; 1 = 25 rows.\n" +
         " * Bit #4: 0 = Screen off, complete screen is covered by border; 1 = Screen on, normal screen contents are visible.\n" +
         " * Bit #5: 0 = Text mode; 1 = Bitmap mode.\n" +
         " * Bit #6: 1 = Extended background mode on.\n" +
         " * Bit #7:\n" +
         "   * Read: Current raster line (bit #8).\n" +
         "   * Write: Raster line to generate interrupt at (bit #8).\n" +
         "\n" +
         "Default: $1B, %00011011.\n",

"$d012": "Read: Current raster line (bits #0-#7).  \n" +
         "Write: Raster line to generate interrupt at (bits #0-#7).\n",

"$d013": "Light pen X-coordinate (bits #1-#8).  \n" +
         "Read-only.\n",

"$d014": "Light pen Y-coordinate.  \n" +
         "Read-only.\n",

"$d015": "Sprite enable register. Bits:\n" +
         " * Bit #x: 1 = Sprite #x is enabled, drawn onto the screen.\n",

"$d016": "Screen control register #2. Bits:\n" +
         " * Bits #0-#2: Horizontal raster scroll.\n" +
         " * Bit #3: Screen width; 0 = 38 columns; 1 = 40 columns.\n" +
         " * Bit #4: 1 = Multicolor mode on.\n" +
         "\n" +
         "Default: $C8, %11001000.\n",

"$d017": "Sprite double height register. Bits:\n" +
         " * Bit #x: 1 = Sprite #x is stretched to double height.\n",

"$d018": "Memory setup register. Bits:\n" +
         "\n" +
         " * Bits #1-#3: In text mode, pointer to character memory (bits #11-#13), relative to VIC bank, memory address $DD00. Values:\n" +
         "\n" +
         "   * %000, 0: $0000-$07FF, 0-2047.\n" +
         "   * %001, 1: $0800-$0FFF, 2048-4095.\n" +
         "   * %010, 2: $1000-$17FF, 4096-6143.\n" +
         "   * %011, 3: $1800-$1FFF, 6144-8191.\n" +
         "   * %100, 4: $2000-$27FF, 8192-10239.\n" +
         "   * %101, 5: $2800-$2FFF, 10240-12287.\n" +
         "   * %110, 6: $3000-$37FF, 12288-14335.\n" +
         "   * %111, 7: $3800-$3FFF, 14336-16383.\n" +
         "\n" +
         "   Values %010 and %011 in VIC bank #0 and #2 select Character ROM instead.\n" +
         "   In bitmap mode, pointer to bitmap memory (bit #13), relative to VIC bank, memory address $DD00. Values:\n" +
         "\n" +
         "   * %0xx, 0: $0000-$1FFF, 0-8191.\n" +
         "   * %1xx, 4: $2000-$3FFF, 8192-16383.\n" +
         "\n" +
         " * Bits #4-#7: Pointer to screen memory (bits #10-#13), relative to VIC bank, memory address $DD00. Values:\n" +
         "\n" +
         "   * %0000, 0: $0000-$03FF, 0-1023.\n" +
         "   * %0001, 1: $0400-$07FF, 1024-2047.\n" +
         "   * %0010, 2: $0800-$0BFF, 2048-3071.\n" +
         "   * %0011, 3: $0C00-$0FFF, 3072-4095.\n" +
         "   * %0100, 4: $1000-$13FF, 4096-5119.\n" +
         "   * %0101, 5: $1400-$17FF, 5120-6143.\n" +
         "   * %0110, 6: $1800-$1BFF, 6144-7167.\n" +
         "   * %0111, 7: $1C00-$1FFF, 7168-8191.\n" +
         "   * %1000, 8: $2000-$23FF, 8192-9215.\n" +
         "   * %1001, 9: $2400-$27FF, 9216-10239.\n" +
         "   * %1010, 10: $2800-$2BFF, 10240-11263.\n" +
         "   * %1011, 11: $2C00-$2FFF, 11264-12287.\n" +
         "   * %1100, 12: $3000-$33FF, 12288-13311.\n" +
         "   * %1101, 13: $3400-$37FF, 13312-14335.\n" +
         "   * %1110, 14: $3800-$3BFF, 14336-15359.\n" +
         "   * %1111, 15: $3C00-$3FFF, 15360-16383.\n",

"$d019": "Interrupt status register.  \n" +
         "* Read bits:\n" +
         "  * Bit #0: 1 = Current raster line is equal to the raster line to generate interrupt at.\n" +
         "  * Bit #1: 1 = Sprite-background collision occurred.\n" +
         "  * Bit #2: 1 = Sprite-sprite collision occurred.\n" +
         "  * Bit #3: 1 = Light pen signal arrived.\n" +
         "  * Bit #7: 1 = An event (or more events), that may generate an interrupt, occurred and it has not been (not all of them have been) acknowledged yet.\n" +
         "\n" +
         "* Write bits:\n" +
         "  * Bit #0: 1 = Acknowledge raster interrupt.\n" +
         "  * Bit #1: 1 = Acknowledge sprite-background collision interrupt.\n" +
         "  * Bit #2: 1 = Acknowledge sprite-sprite collision interrupt.\n" +
         "  * Bit #3: 1 = Acknowledge light pen interrupt.\n",

"$d01a": "Interrupt control register. Bits:\n" +
         " * Bit #0: 1 = Raster interrupt enabled.\n" +
         " * Bit #1: 1 = Sprite-background collision interrupt enabled.\n" +
         " * Bit #2: 1 = Sprite-sprite collision interrupt enabled.\n" +
         " * Bit #3: 1 = Light pen interrupt enabled.\n",

"$d01b": "Sprite priority register. Bits:\n" +
         " * Bit #x: 0 = Sprite #x is drawn in front of screen contents; 1 = Sprite #x is behind screen contents.\n",

"$d01c": "Sprite multicolor mode register. Bits:\n" +
         " * Bit #x: 0 = Sprite #x is single color; 1 = Sprite #x is multicolor.\n",

"$d01d": "Sprite double width register. Bits:\n" +
         " * Bit #x: 1 = Sprite #x is stretched to double width.\n",

"$d01e": "Sprite-sprite collision register.\n" +
         " * Read bits:\n" +
         "   * Bit #x: 1 = Sprite #x collided with another sprite.\n" +
         " * Write: Enable further detection of sprite-sprite collisions.\n",

"$d01f": "Sprite-background collision register.\n" +
         " * Read bits:\n" +
         "   * Bit #x: 1 = Sprite #x collided with background.\n" +
         " * Write: Enable further detection of sprite-background collisions.\n",

"$d020": "Border color (only bits #0-#3).",
"$d021": "Background color (only bits #0-#3).",
"$d022": "Extra background color #1 (only bits #0-#3).",
"$d023": "Extra background color #2 (only bits #0-#3).",
"$d024": "Extra background color #3 (only bits #0-#3).",
"$d025": "Sprite extra color #1 (only bits #0-#3).",
"$d026": "Sprite extra color #2 (only bits #0-#3).",
"$d027": "Sprite #0 color (only bits #0-#3).",
"$d028": "Sprite #1 color (only bits #0-#3).",
"$d029": "Sprite #2 color (only bits #0-#3).",
"$d02a": "Sprite #3 color (only bits #0-#3).",
"$d02b": "Sprite #4 color (only bits #0-#3).",
"$d02c": "Sprite #5 color (only bits #0-#3).",
"$d02d": "Sprite #6 color (only bits #0-#3).",
"$d02e": "Sprite #7 color (only bits #0-#3).",

}