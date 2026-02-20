export enum TokenType {
  VALUE = 'VALUE',
  WHITESPACES = 'WHITESPACES',      // :
  ASSIGN = 'ASSIGN',      // :
  SEPERATE = 'SEPERATE',  // ,
  INDENT = 'INDENT',      // \n + indent increase
  DEDENT = 'DEDENT',      // \n + indent decrease OR ; in indented block
  NEWLINE = 'NEWLINE',    // \n + same indent
  SEMICOLON = 'SEMICOLON',// ; in inline context
  EOF = 'EOF'
}

export interface Token {
  type: TokenType;
  value: string;
}
