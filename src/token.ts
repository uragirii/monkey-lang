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
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',
  LT: '<',
  GT: '>',
  EQ: '==',
  NOT_EQ: '!=',
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
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN',
} as const;

export const KEYWORDS: Record<string, TokenType> = {
  let: TOKENS.LET,
  fn: TOKENS.FUNCTION,
  true: TOKENS.TRUE,
  false: TOKENS.FALSE,
  if: TOKENS.IF,
  else: TOKENS.ELSE,
  return: TOKENS.RETURN,
};
