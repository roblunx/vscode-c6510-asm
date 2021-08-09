
export let illegalOpcodes:any = {
    "AAC":
    "```text\n" +
    "AND byte with accumulator. If result is negative then carry is\n" +
    "set. Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |AAC #arg   |$0B| 2 | 2\n" +
    "Immediate   |AAC #arg   |$2B| 2 | 2\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "ANC - Craig Taylor  \n" +
    "ANC - Adam Vardy_  \n",

    "AAX":
    "```text\n" +
    "AND X register with accumulator and store result in memory.\n" +
    "Status flags: N,Z\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |AAX arg    |$87| 2 | 3\n" +
    "Zero Page,Y |AAX arg,Y  |$97| 2 | 4\n" +
    "(Indirect,X)|AAX (arg,X)|$83| 2 | 6\n" +
    "Absolute    |AAX arg    |$8F| 3 | 4\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SAX - Craig Taylor  \n" +
    "AXS - Adam Vardy_  \n",

    "ARR":
    "```text\n" +
    "AND byte with accumulator, then rotate one bit right in accu-\n" +
    "mulator and check bit 5 and 6:\n" +
    "If both bits are 1: set C, clear V.\n" +
    "If both bits are 0: clear C and V.\n" +
    "If only bit 5 is 1: set V, clear C.\n" +
    "If only bit 6 is 1: set C and V.\n" +
    "Status flags: N,V,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |ARR #arg   |$6B| 2 | 2\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "ARR - Craig Taylor  \n" +
    "ARR - Adam Vardy_  \n",

    "ASR":
    "```text\n" +
    "AND byte with accumulator, then shift right one bit in accumu-\n" +
    "lator. Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |ASR #arg   |$4B| 2 | 2\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "ASR - Craig Taylor  \n" +
    "ALR - Adam Vardy_  \n",

    "ATX":
    "```text\n" +
    "AND byte with accumulator, then transfer accumulator to X\n" +
    "register. Status flags: N,Z\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |ATX #arg   |$AB| 2 | 2\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "LXA - Craig Taylor  \n" +
    "OAL - Adam Vardy_  \n",

    "AXA":
    "```text\n" +
    "AND X register with accumulator then AND result with 7 and\n" +
    "store in memory. Status flags: -\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Absolute,Y  |AXA arg,Y  |$9F| 3 | 5\n" +
    "(Indirect),Y|AXA arg    |$93| 2 | 6\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SHA - Craig Taylor  \n" +
    "AXA - Adam Vardy_  \n",

    "AXS":
    "```text\n" +
    "AND X register with accumulator and store result in X regis-\n" +
    "ter, then subtract byte from X register (without borrow).\n" +
    "Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |AXS #arg   |$CB| 2 | 2\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SBX - Craig Taylor  \n" +
    "SAX - Adam Vardy_  \n",

    "DCP":
    "```text\n" +
    "Subtract 1 from memory (without borrow).\n" +
    "Status flags: C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |DCP arg    |$C7| 2 | 5\n" +
    "Zero Page,X |DCP arg,X  |$D7| 2 | 6\n" +
    "Absolute    |DCP arg    |$CF| 3 | 6\n" +
    "Absolute,X  |DCP arg,X  |$DF| 3 | 7\n" +
    "Absolute,Y  |DCP arg,Y  |$DB| 3 | 7\n" +
    "(Indirect,X)|DCP (arg,X)|$C3| 2 | 8\n" +
    "(Indirect),Y|DCP (arg),Y|$D3| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "DCP - Craig Taylor  \n" +
    "DCM - Adam Vardy_  \n",

    "ISC":
    "```text\n" +
    "Increase memory by one, then subtract memory from accumulator\n" +
    "(with borrow). Status flags: N,V,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |ISC arg    |$E7| 2 | 5\n" +
    "Zero Page,X |ISC arg,X  |$F7| 2 | 6\n" +
    "Absolute    |ISC arg    |$EF| 3 | 6\n" +
    "Absolute,X  |ISC arg,X  |$FF| 3 | 7\n" +
    "Absolute,Y  |ISC arg,Y  |$FB| 3 | 7\n" +
    "(Indirect,X)|ISC (arg,X)|$E3| 2 | 8\n" +
    "(Indirect),Y|ISC (arg),Y|$F3| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "ISB - Craig Taylor  \n" +
    "INS - Adam Vardy_  \n",

    "LAR":
    "```text\n" +
    "AND memory with stack pointer, transfer result to accumulator,\n" +
    "X register and stack pointer.\n" +
    "Status flags: N,Z\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Absolute,Y  |LAR arg,Y  |$BB| 3 | 4 *\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "LAE - Craig Taylor  \n" +
    "LAS - Adam Vardy_  \n",

    "LAX":
    "```text\n" +
    "Load accumulator and X register with memory.\n" +
    "Status flags: N,Z\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |LAX arg    |$A7| 2 | 3\n" +
    "Zero Page,Y |LAX arg,Y  |$B7| 2 | 4\n" +
    "Absolute    |LAX arg    |$AF| 3 | 4\n" +
    "Absolute,Y  |LAX arg,Y  |$BF| 3 | 4 *\n" +
    "(Indirect,X)|LAX (arg,X)|$A3| 2 | 6\n" +
    "(Indirect),Y|LAX (arg),Y|$B3| 2 | 5 *\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "LAX - Craig Taylor  \n" +
    "LAX - Adam Vardy_  \n",

    "RLA":
    "```text\n" +
    "Rotate one bit left in memory, then AND accumulator with\n" +
    "memory. Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |RLA arg    |$27| 2 | 5\n" +
    "Zero Page,X |RLA arg,X  |$37| 2 | 6\n" +
    "Absolute    |RLA arg    |$2F| 3 | 6\n" +
    "Absolute,X  |RLA arg,X  |$3F| 3 | 7\n" +
    "Absolute,Y  |RLA arg,Y  |$3B| 3 | 7\n" +
    "(Indirect,X)|RLA (arg,X)|$23| 2 | 8\n" +
    "(Indirect),Y|RLA (arg),Y|$33| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "RLA - Craig Taylor  \n" +
    "RLA - Adam Vardy_  \n",

    "RRA":
    "```text\n" +
    "Rotate one bit right in memory, then add memory to accumulator\n" +
    "(with carry).\n" +
    "\n" +
    "Status flags: N,V,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |RRA arg    |$67| 2 | 5\n" +
    "Zero Page,X |RRA arg,X  |$77| 2 | 6\n" +
    "Absolute    |RRA arg    |$6F| 3 | 6\n" +
    "Absolute,X  |RRA arg,X  |$7F| 3 | 7\n" +
    "Absolute,Y  |RRA arg,Y  |$7B| 3 | 7\n" +
    "(Indirect,X)|RRA (arg,X)|$63| 2 | 8\n" +
    "(Indirect),Y|RRA (arg),Y|$73| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "RRA - Craig Taylor  \n" +
    "RRA - Adam Vardy_  \n",

    "SLO":
    "```text\n" +
    "Shift left one bit in memory, then OR accumulator with memory.\n" +
    "\n" +
    "Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |SLO arg    |$07| 2 | 5\n" +
    "Zero Page,X |SLO arg,X  |$17| 2 | 6\n" +
    "Absolute    |SLO arg    |$0F| 3 | 6\n" +
    "Absolute,X  |SLO arg,X  |$1F| 3 | 7\n" +
    "Absolute,Y  |SLO arg,Y  |$1B| 3 | 7\n" +
    "(Indirect,X)|SLO (arg,X)|$03| 2 | 8\n" +
    "(Indirect),Y|SLO (arg),Y|$13| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SLO - Craig Taylor  \n" +
    "ASO - Adam Vardy_  \n",

    "SRE":
    "```text\n" +
    "Shift right one bit in memory, then EOR accumulator with\n" +
    "memory. Status flags: N,Z,C\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Zero Page   |SRE arg    |$47| 2 | 5\n" +
    "Zero Page,X |SRE arg,X  |$57| 2 | 6\n" +
    "Absolute    |SRE arg    |$4F| 3 | 6\n" +
    "Absolute,X  |SRE arg,X  |$5F| 3 | 7\n" +
    "Absolute,Y  |SRE arg,Y  |$5B| 3 | 7\n" +
    "(Indirect,X)|SRE (arg,X)|$43| 2 | 8\n" +
    "(Indirect),Y|SRE (arg),Y|$53| 2 | 8\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SRE - Craig Taylor  \n" +
    "LSE - Adam Vardy_  \n",

    "SXA":
    "```text\n" +
    "AND X register with the high byte of the target address of the\n" +
    "argument + 1. Store the result in memory.\n" +
    "\n" +
    "M = X AND HIGH(arg) + 1\n" +
    "\n" +
    "Status flags: -\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Absolute,Y  |SXA arg,Y  |$9E| 3 | 5\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SHX - Craig Taylor  \n" +
    "XAS - Adam Vardy_  \n",

    "SYA":
    "```text\n" +
    "AND Y register with the high byte of the target address of the\n" +
    "argument + 1. Store the result in memory.\n" +
    "\n" +
    "M = Y AND HIGH(arg) + 1\n" +
    "\n" +
    "Status flags: -\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Absolute,X  |SYA arg,X  |$9C| 3 | 5\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SHY - Craig Taylor  \n" +
    "SAY - Adam Vardy_  \n",

    "XAS":
    "```text\n" +
    "AND X register with accumulator and store result in stack\n" +
    "pointer, then AND stack pointer with the high byte of the\n" +
    "target address of the argument + 1. Store result in memory.\n" +
    "\n" +
    "S = X AND A, M = S AND HIGH(arg) + 1\n" +
    "\n" +
    "Status flags: -\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Absolute,Y  |XAS arg,Y  |$9B| 3 | 5\n" +
    "```\n" +
    "\n" +
    "_Also known as:  \n" +
    "SHS - Craig Taylor  \n" +
    "TAS - Adam Vardy_  \n",

    "XAA":
    "**(highly unstable)**  \n" +
    "_external ref A = (A | magic) & X & imm_  \n" +
    "```text\n" +
    "transfer x to accumulator, AND byte with accumulator\n" +
    "register. Status flags: N,Z\n" +
    "\n" +
    "Addressing  |Mnemonics  |Opc|Sz | n\n" +
    "------------|-----------|---|---|---\n" +
    "Immediate   |XAA #arg   |$AB| 2 | 2\n" +
    "```\n",

}