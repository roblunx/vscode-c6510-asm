
export let opcodes:any = {
    "ADC":
    "Add Memory to Accumulator with Carry \n" +
    "\n" +
    "A + M + C -> A, C                N Z C I D V \n" +
    "                                 + + + - - + \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     ADC #oper     69    2     2 \n" +
    "zeropage      ADC oper      65    2     3 \n" +
    "zeropage,X    ADC oper,X    75    2     4 \n" +
    "absolute      ADC oper      6D    3     4 \n" +
    "absolute,X    ADC oper,X    7D    3     4* \n" +
    "absolute,Y    ADC oper,Y    79    3     4* \n" +
    "(indirect,X)  ADC (oper,X)  61    2     6 \n" +
    "(indirect),Y  ADC (oper),Y  71    2     5* ",

    "AND":
    "And Memory with Accumulator \n" +
    "\n" +
    "A AND M -> A                     N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     AND #oper     29    2     2 \n" +
    "zeropage      AND oper      25    2     3 \n" +
    "zeropage,X    AND oper,X    35    2     4 \n" +
    "absolute      AND oper      2D    3     4 \n" +
    "absolute,X    AND oper,X    3D    3     4* \n" +
    "absolute,Y    AND oper,Y    39    3     4* \n" +
    "(indirect,X)  AND (oper,X)  21    2     6 \n" +
    "(indirect),Y  AND (oper),Y  31    2     5* ",

    "ASL":
    "Shift Left One Bit (Memory or Accumulator) \n" +
    "\n" +
    "C <- [76543210] <- 0             N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "accumulator   ASL A         0A    1     2 \n" +
    "zeropage      ASL oper      06    2     5 \n" +
    "zeropage,X    ASL oper,X    16    2     6 \n" +
    "absolute      ASL oper      0E    3     6 \n" +
    "absolute,X    ASL oper,X    1E    3     7 ",

    "BCC":
    "Branch on Carry Clear \n" +
    "\n" +
    "branch on C = 0                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BCC oper      90    2     2** ",

    "BCS":
    "Branch on Carry Set \n" +
    "\n" +
    "branch on C = 1                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BCS oper      B0    2     2** ",

    "BEQ":
    "Branch on Result Zero \n" +
    "\n" +
    "branch on Z = 1                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BEQ oper      F0    2     2** ",

    "BIT":
    "Test Bits in Memory with Accumulator \n" +
    "\n" +
    "bits 7 and 6 of operand are transfered to bit 7 and 6 of SR (N,V); \n" +
    "the zeroflag is set to the result of operand AND accumulator. \n" +
    "\n" +
    "A AND M, M7 -> N, M6 -> V        N Z C I D V \n" +
    "                                M7 + - - - M6 \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      BIT oper      24    2     3 \n" +
    "absolute      BIT oper      2C    3     4 ",

    "BMI":
    "Branch on Result Minus \n" +
    "\n" +
    "branch on N = 1                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BMI oper      30    2     2** ",

    "BNE":
    "Branch on Result not Zero \n" +
    "\n" +
    "branch on Z = 0                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BNE oper      D0    2     2** ",

    "BPL":
    "Branch on Result Plus \n" +
    "\n" +
    "branch on N = 0                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BPL oper      10    2     2** ",

    "BRK":
    "Force Break \n" +
    "\n" +
    "interrupt,                       N Z C I D V \n" +
    "push PC+2, push SR               - - - 1 - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       BRK           00    1     7 ",

    "BVC":
    "Branch on Overflow Clear \n" +
    "\n" +
    "branch on V = 0                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BVC oper      50    2     2** ",

    "BVS":
    "Branch on Overflow Set \n" +
    "\n" +
    "branch on V = 1                  N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "relative      BVC oper      70    2     2** ",

    "CLC":
    "Clear Carry Flag \n" +
    "\n" +
    "0 -> C                           N Z C I D V \n" +
    "                                 - - 0 - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       CLC           18    1     2 ",

    "CLD":
    "Clear Decimal Mode \n" +
    "\n" +
    "0 -> D                           N Z C I D V \n" +
    "                                 - - - - 0 - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       CLD           D8    1     2 ",

    "CLI":
    "Clear Interrupt Disable Bit \n" +
    "\n" +
    "0 -> I                           N Z C I D V \n" +
    "                                 - - - 0 - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       CLI           58    1     2 ",

    "CLV":
    "Clear Overflow Flag \n" +
    "\n" +
    "0 -> V                           N Z C I D V \n" +
    "                                 - - - - - 0 \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       CLV           B8    1     2 ",

    "CMP":
    "Compare Memory with Accumulator \n" +
    "\n" +
    "A - M                            N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     CMP #oper     C9    2     2 \n" +
    "zeropage      CMP oper      C5    2     3 \n" +
    "zeropage,X    CMP oper,X    D5    2     4 \n" +
    "absolute      CMP oper      CD    3     4 \n" +
    "absolute,X    CMP oper,X    DD    3     4* \n" +
    "absolute,Y    CMP oper,Y    D9    3     4* \n" +
    "(indirect,X)  CMP (oper,X)  C1    2     6 \n" +
    "(indirect),Y  CMP (oper),Y  D1    2     5* ",

    "CPX":
    "Compare Memory and Index X \n" +
    "\n" +
    "X - M                            N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     CPX #oper     E0    2     2 \n" +
    "zeropage      CPX oper      E4    2     3 \n" +
    "absolute      CPX oper      EC    3     4 ",

    "CPY":
    "Compare Memory and Index Y \n" +
    "\n" +
    "Y - M                            N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     CPY #oper     C0    2     2 \n" +
    "zeropage      CPY oper      C4    2     3 \n" +
    "absolute      CPY oper      CC    3     4 ",

    "DEC":
    "Decrement Memory by One \n" +
    "\n" +
    "M - 1 -> M                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      DEC oper      C6    2     5 \n" +
    "zeropage,X    DEC oper,X    D6    2     6 \n" +
    "absolute      DEC oper      CE    3     6 \n" +
    "absolute,X    DEC oper,X    DE    3     7 ",

    "DEX":
    "Decrement Index X by One \n" +
    "\n" +
    "X - 1 -> X                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       DEC           CA    1     2 ",

    "DEY":
    "Decrement Index Y by One \n" +
    "\n" +
    "Y - 1 -> Y                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       DEC           88    1     2 ",

    "EOR":
    "Exclusive-OR Memory with Accumulator \n" +
    "\n" +
    "A EOR M -> A                     N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     EOR #oper     49    2     2 \n" +
    "zeropage      EOR oper      45    2     3 \n" +
    "zeropage,X    EOR oper,X    55    2     4 \n" +
    "absolute      EOR oper      4D    3     4 \n" +
    "absolute,X    EOR oper,X    5D    3     4* \n" +
    "absolute,Y    EOR oper,Y    59    3     4* \n" +
    "(indirect,X)  EOR (oper,X)  41    2     6 \n" +
    "(indirect),Y  EOR (oper),Y  51    2     5* ",

    "INC":
    "Increment Memory by One \n" +
    "\n" +
    "M + 1 -> M                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      INC oper      E6    2     5 \n" +
    "zeropage,X    INC oper,X    F6    2     6 \n" +
    "absolute      INC oper      EE    3     6 \n" +
    "absolute,X    INC oper,X    FE    3     7 ",

    "INX":
    "Increment Index X by One \n" +
    "\n" +
    "X + 1 -> X                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       INX           E8    1     2 ",

    "INY":
    "Increment Index Y by One \n" +
    "\n" +
    "Y + 1 -> Y                       N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       INY           C8    1     2 ",

    "JMP":
    "Jump to New Location \n" +
    "\n" +
    "(PC+1) -> PCL                    N Z C I D V \n" +
    "(PC+2) -> PCH                    - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "absolute      JMP oper      4C    3     3 \n" +
    "indirect      JMP (oper)    6C    3     5 ",

    "JSR":
    "Jump to New Location Saving Return Address \n" +
    "\n" +
    "push (PC+2),                     N Z C I D V \n" +
    "(PC+1) -> PCL                    - - - - - - \n" +
    "(PC+2) -> PCH \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "absolute      JSR oper      20    3     6 ",

    "LDA":
    "Load Accumulator with Memory \n" +
    "\n" +
    "M -> A                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     LDA #oper     A9    2     2 \n" +
    "zeropage      LDA oper      A5    2     3 \n" +
    "zeropage,X    LDA oper,X    B5    2     4 \n" +
    "absolute      LDA oper      AD    3     4 \n" +
    "absolute,X    LDA oper,X    BD    3     4* \n" +
    "absolute,Y    LDA oper,Y    B9    3     4* \n" +
    "(indirect,X)  LDA (oper,X)  A1    2     6 \n" +
    "(indirect),Y  LDA (oper),Y  B1    2     5* ",

    "LDX":
    "Load Index X with Memory \n" +
    "\n" +
    "M -> X                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     LDX #oper     A2    2     2 \n" +
    "zeropage      LDX oper      A6    2     3 \n" +
    "zeropage,Y    LDX oper,Y    B6    2     4 \n" +
    "absolute      LDX oper      AE    3     4 \n" +
    "absolute,Y    LDX oper,Y    BE    3     4* ",

    "LDY":
    "Load Index Y with Memory \n" +
    "\n" +
    "M -> Y                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     LDY #oper     A0    2     2 \n" +
    "zeropage      LDY oper      A4    2     3 \n" +
    "zeropage,X    LDY oper,X    B4    2     4 \n" +
    "absolute      LDY oper      AC    3     4 \n" +
    "absolute,X    LDY oper,X    BC    3     4* ",

    "LSR":
    "Shift One Bit Right (Memory or Accumulator) \n" +
    "\n" +
    "0 -> [76543210] -> C             N Z C I D V \n" +
    "                                 - + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "accumulator   LSR A         4A    1     2 \n" +
    "zeropage      LSR oper      46    2     5 \n" +
    "zeropage,X    LSR oper,X    56    2     6 \n" +
    "absolute      LSR oper      4E    3     6 \n" +
    "absolute,X    LSR oper,X    5E    3     7 ",

    "NOP":
    "No Operation \n" +
    "\n" +
    "---                              N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       NOP           EA    1     2 ",

    "ORA":
    "OR Memory with Accumulator \n" +
    "\n" +
    "A OR M -> A                      N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     ORA #oper     09    2     2 \n" +
    "zeropage      ORA oper      05    2     3 \n" +
    "zeropage,X    ORA oper,X    15    2     4 \n" +
    "absolute      ORA oper      0D    3     4 \n" +
    "absolute,X    ORA oper,X    1D    3     4* \n" +
    "absolute,Y    ORA oper,Y    19    3     4* \n" +
    "(indirect,X)  ORA (oper,X)  01    2     6 \n" +
    "(indirect),Y  ORA (oper),Y  11    2     5* ",

    "PHA":
    "Push Accumulator on Stack \n" +
    "\n" +
    "push A                           N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       PHA           48    1     3 ",

    "PHP":
    "Push Processor Status on Stack \n" +
    "\n" +
    "push SR                          N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       PHP           08    1     3 ",

    "PLA":
    "Pull Accumulator from Stack \n" +
    "\n" +
    "pull A                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       PLA           68    1     4 ",

    "PLP":
    "Pull Processor Status from Stack \n" +
    "\n" +
    "pull SR                          N Z C I D V \n" +
    "                                 from stack \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       PHP           28    1     4 ",

    "ROL":
    "Rotate One Bit Left (Memory or Accumulator) \n" +
    "\n" +
    "C <- [76543210] <- C             N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "accumulator   ROL A         2A    1     2 \n" +
    "zeropage      ROL oper      26    2     5 \n" +
    "zeropage,X    ROL oper,X    36    2     6 \n" +
    "absolute      ROL oper      2E    3     6 \n" +
    "absolute,X    ROL oper,X    3E    3     7 ",

    "ROR":
    "Rotate One Bit Right (Memory or Accumulator) \n" +
    "\n" +
    "C -> [76543210] -> C             N Z C I D V \n" +
    "                                 + + + - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "accumulator   ROR A         6A    1     2 \n" +
    "zeropage      ROR oper      66    2     5 \n" +
    "zeropage,X    ROR oper,X    76    2     6 \n" +
    "absolute      ROR oper      6E    3     6 \n" +
    "absolute,X    ROR oper,X    7E    3     7 ",

    "RTI":
    "Return from Interrupt \n" +
    "\n" +
    "pull SR, pull PC                 N Z C I D V \n" +
    "                                 from stack \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       RTI           40    1     6 ",

    "RTS":
    "Return from Subroutine \n" +
    "\n" +
    "pull PC, PC+1 -> PC              N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       RTS           60    1     6 ",

    "SBC":
    "Subtract Memory from Accumulator with Borrow \n" +
    "\n" +
    "A - M - C -> A                   N Z C I D V \n" +
    "                                 + + + - - + \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "immidiate     SBC #oper     E9    2     2 \n" +
    "zeropage      SBC oper      E5    2     3 \n" +
    "zeropage,X    SBC oper,X    F5    2     4 \n" +
    "absolute      SBC oper      ED    3     4 \n" +
    "absolute,X    SBC oper,X    FD    3     4* \n" +
    "absolute,Y    SBC oper,Y    F9    3     4* \n" +
    "(indirect,X)  SBC (oper,X)  E1    2     6 \n" +
    "(indirect),Y  SBC (oper),Y  F1    2     5* ",

    "SEC":
    "Set Carry Flag \n" +
    "\n" +
    "1 -> C                           N Z C I D V \n" +
    "                                 - - 1 - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       SEC           38    1     2 ",

    "SED":
    "Set Decimal Flag \n" +
    "\n" +
    "1 -> D                           N Z C I D V \n" +
    "                                 - - - - 1 - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       SED           F8    1     2 ",

    "SEI":
    "Set Interrupt Disable Status \n" +
    "\n" +
    "1 -> I                           N Z C I D V \n" +
    "                                 - - - 1 - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       SEI           78    1     2 ",

    "STA":
    "Store Accumulator in Memory \n" +
    "\n" +
    "A -> M                           N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      STA oper      85    2     3 \n" +
    "zeropage,X    STA oper,X    95    2     4 \n" +
    "absolute      STA oper      8D    3     4 \n" +
    "absolute,X    STA oper,X    9D    3     5 \n" +
    "absolute,Y    STA oper,Y    99    3     5 \n" +
    "(indirect,X)  STA (oper,X)  81    2     6 \n" +
    "(indirect),Y  STA (oper),Y  91    2     6 ",

    "STX":
    "Store Index X in Memory \n" +
    "\n" +
    "X -> M                           N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      STX oper      86    2     3 \n" +
    "zeropage,Y    STX oper,Y    96    2     4 \n" +
    "absolute      STX oper      8E    3     4 ",

    "STY":
    "Store Index Y in Memory \n" +
    "\n" +
    "Y -> M                           N Z C I D V \n" +
    "                                 - - - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "zeropage      STY oper      84    2     3 \n" +
    "zeropage,X    STY oper,X    94    2     4 \n" +
    "absolute      STY oper      8C    3     4 ",

    "TAX":
    "Transfer Accumulator to Index X \n" +
    "\n" +
    "A -> X                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TAX           AA    1     2 ",

    "TAY":
    "Transfer Accumulator to Index Y \n" +
    "\n" +
    "A -> Y                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TAY           A8    1     2 ",

    "TSX":
    "Transfer Stack Pointer to Index X \n" +
    "\n" +
    "SP -> X                          N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TSX           BA    1     2 ",

    "TXA":
    "Transfer Index X to Accumulator \n" +
    "\n" +
    "X -> A                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TXA           8A    1     2 ",

    "TXS":
    "Transfer Index X to Stack Register \n" +
    "\n" +
    "X -> SP                          N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TXS           9A    1     2 ",

    "TYA":
    "Transfer Index Y to Accumulator \n" +
    "\n" +
    "Y -> A                           N Z C I D V \n" +
    "                                 + + - - - - \n" +
    "\n" +
    "addressing    assembler    opc  bytes  cycles \n" +
    "--------------------------------------------- \n" +
    "implied       TYA           98    1     2 \n"
};

