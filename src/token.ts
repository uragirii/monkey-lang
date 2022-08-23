type TokenConstant = typeof TOKENS;

export type TokenKeys = keyof TokenConstant;

export type TokenType = TokenConstant[keyof TokenConstant];

export class Token {
  type: TokenType;
  literal: string;

  constructor(type: TokenType, literal: string) {
    this.literal = literal;
    this.type = type;
  }
}

export const TOKENS = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
  // Identifiers + literals
  IDENT: 'IDENT', // add, foobar, x, y, ...
  INT: 'INT',
  // Operators
  ASSIGN: '=',
  PLUS: '+',
  // Delimiters
  COMMA: ',',
  SEMICOLON: ';',
  LPAREN: '(',
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',
  // Keywords
  // 1343456
  FUNCTION: 'FUNCTION',
  LET: 'LET',
} as const;
