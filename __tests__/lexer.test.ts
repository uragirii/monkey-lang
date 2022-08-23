import { Lexer } from '../src/lexer.js';
import { TOKENS } from '../src/token.js';

describe('test next token', () => {
  it('checks order of token', () => {
    const input = '=+(){},;';
    const output = [
      TOKENS.ASSIGN,
      TOKENS.PLUS,
      TOKENS.LPAREN,
      TOKENS.RPAREN,
      TOKENS.LBRACE,
      TOKENS.RBRACE,
      TOKENS.COMMA,
      TOKENS.SEMICOLON,
    ];

    const lexer = new Lexer(input);

    for (let index = 0; index < input.length; index++) {
      expect(lexer.nextToken().type).toBe(output[index]);
    }
  });
});
