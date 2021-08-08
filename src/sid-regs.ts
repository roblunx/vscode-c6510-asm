
export let sidregs:any = {

"$d400": "Voice #1 frequency.  \n" +
         "Write-only.\n",

"$d401": "Voice #1 frequency.  \n" +
         "Write-only.\n",

"$d402": "Voice #1 pulse width.  \n" +
         "Write-only.\n",

"$d403": "Voice #1 pulse width.  \n" +
         "Write-only.\n",

"$d404": "Voice #1 control register. Bits:\n" +
         " * Bit #0: 0 = Voice off, Release cycle; 1 = Voice on, Attack-Decay-Sustain cycle.\n" +
         " * Bit #1: 1 = Synchronization enabled.\n" +
         " * Bit #2: 1 = Ring modulation enabled.\n" +
         " * Bit #3: 1 = Disable voice, reset noise generator.\n" +
         " * Bit #4: 1 = Triangle waveform enabled.\n" +
         " * Bit #5: 1 = Saw waveform enabled.\n" +
         " * Bit #6: 1 = Rectangle waveform enabled.\n" +
         " * Bit #7: 1 = Noise enabled.\n" +
         "\n" +
         "Write-only.\n",

"$d405": "Voice #1 Attack and Decay length. Bits:\n" +
         " * Bits #0-#3: Decay length. Values:\n" +
         "   * %0000, 0: 6 ms.\n" +
         "   * %0001, 1: 24 ms.\n" +
         "   * %0010, 2: 48 ms.\n" +
         "   * %0011, 3: 72 ms.\n" +
         "   * %0100, 4: 114 ms.\n" +
         "   * %0101, 5: 168 ms.\n" +
         "   * %0110, 6: 204 ms.\n" +
         "   * %0111, 7: 240 ms.\n" +
         "   * %1000, 8: 300 ms.\n" +
         "   * %1001, 9: 750 ms.\n" +
         "   * %1010, 10: 1.5 s.\n" +
         "   * %1011, 11: 2.4 s.\n" +
         "   * %1100, 12: 3 s.\n" +
         "   * %1101, 13: 9 s.\n" +
         "   * %1110, 14: 15 s.\n" +
         "   * %1111, 15: 24 s.\n" +
         " * Bits #4-#7: Attack length. Values:\n" +
         "   * %0000, 0: 2 ms.\n" +
         "   * %0001, 1: 8 ms.\n" +
         "   * %0010, 2: 16 ms.\n" +
         "   * %0011, 3: 24 ms.\n" +
         "   * %0100, 4: 38 ms.\n" +
         "   * %0101, 5: 56 ms.\n" +
         "   * %0110, 6: 68 ms.\n" +
         "   * %0111, 7: 80 ms.\n" +
         "   * %1000, 8: 100 ms.\n" +
         "   * %1001, 9: 250 ms.\n" +
         "   * %1010, 10: 500 ms.\n" +
         "   * %1011, 11: 800 ms.\n" +
         "   * %1100, 12: 1 s.\n" +
         "   * %1101, 13: 3 s.\n" +
         "   * %1110, 14: 5 s.\n" +
         "   * %1111, 15: 8 s.\n" +
         "\n" +
         "Write-only.\n",

"$d406": "Voice #1 Sustain volume and Release length. Bits:\n" +
         " * Bits #0-#3: Release length. Values:\n" +
         "   * %0000, 0: 6 ms.\n" +
         "   * %0001, 1: 24 ms.\n" +
         "   * %0010, 2: 48 ms.\n" +
         "   * %0011, 3: 72 ms.\n" +
         "   * %0100, 4: 114 ms.\n" +
         "   * %0101, 5: 168 ms.\n" +
         "   * %0110, 6: 204 ms.\n" +
         "   * %0111, 7: 240 ms.\n" +
         "   * %1000, 8: 300 ms.\n" +
         "   * %1001, 9: 750 ms.\n" +
         "   * %1010, 10: 1.5 s.\n" +
         "   * %1011, 11: 2.4 s.\n" +
         "   * %1100, 12: 3 s.\n" +
         "   * %1101, 13: 9 s.\n" +
         "   * %1110, 14: 15 s.\n" +
         "   * %1111, 15: 24 s.\n" +
         " * Bits #4-#7: Sustain volume.\n" +
         "\n" +
         "Write-only.\n",

"$d407": "Voice #2 frequency.  \n" +
         "Write-only.\n",

"$d408": "Voice #2 frequency.  \n" +
         "Write-only.\n",

"$d409": "Voice #2 pulse width.  \n" +
         "Write-only.\n",

"$d40a": "Voice #2 pulse width.  \n" +
         "Write-only.\n",

"$d40b": "Voice #2 control register.  \n" +
         "Write-only.\n",

"$d40c": "Voice #2 Attack and Decay length.  \n" +
         "Write-only.\n",

"$d40d": "Voice #2 Sustain volume and Release length.  \n" +
         "Write-only.\n",

"$d40e": "Voice #3 frequency.  \n" +
         "Write-only.\n",

"$d40f": "Voice #3 frequency.  \n" +
         "Write-only.\n",

"$d410": "Voice #3 pulse width.  \n" +
         "Write-only.\n",

"$d411": "Voice #3 pulse width.  \n" +
         "Write-only.\n",

"$d412": "Voice #3 control register.  \n" +
         "Write-only.\n",

"$d413": "Voice #3 Attack and Decay length.  \n" +
         "Write-only.\n",

"$d414": "Voice #3 Sustain volume and Release length.  \n" +
         "Write-only.\n",

"$d415": "Filter cut off frequency (bits #0-#2).  \n" +
         "Write-only.\n",

"$d416": "Filter cut off frequency (bits #3-#10).  \n" +
         "Write-only.\n",

"$d417": "Filter control. Bits:\n" +
         " * Bit #0: 1 = Voice #1 filtered.\n" +
         " * Bit #1: 1 = Voice #2 filtered.\n" +
         " * Bit #2: 1 = Voice #3 filtered.\n" +
         " * Bit #3: 1 = External voice filtered.\n" +
         " * Bits #4-#7: Filter resonance.\n" +
         "\n" +
         "Write-only.\n",

"$d418": "Volume and filter modes. Bits:\n" +
         " * Bits #0-#3: Volume.\n" +
         " * Bit #4: 1 = Low pass filter enabled.\n" +
         " * Bit #5: 1 = Band pass filter enabled.\n" +
         " * Bit #6: 1 = High pass filter enabled.\n" +
         " * Bit #7: 1 = Voice #3 disabled.\n" +
         "\n" +
         "Write-only.\n",

"$d419": "X value of paddle selected at memory address $DC00. (Updates at every 512 system cycles.)  \n" +
         "Read-only.\n",

"$d41a": "Y value of paddle selected at memory address $DC00. (Updates at every 512 system cycles.)  \n" +
         "Read-only.\n",

"$d41b": "Voice #3 waveform output.  \n" +
         "Read-only.\n",

"$d41c": "Voice #3 ADSR output.  \n" +
         "Read-only.\n",

}
