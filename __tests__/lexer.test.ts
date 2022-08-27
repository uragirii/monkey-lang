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

  it('checks for valid monkey code', () => {
    const input = `let five = 5;
    let ten = 10;
       let add = fn(x, y) {
         x + y;
    };
       let result = add(five, ten);`;
    const output = [
      TOKENS.LET,
      TOKENS.IDENT,
      TOKENS.ASSIGN,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.LET,
      TOKENS.IDENT,
      TOKENS.ASSIGN,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.LET,
      TOKENS.IDENT,
      TOKENS.ASSIGN,
      TOKENS.FUNCTION,
      TOKENS.LPAREN,
      TOKENS.IDENT,
      TOKENS.COMMA,
      TOKENS.IDENT,
      TOKENS.RPAREN,
      TOKENS.LBRACE,
      TOKENS.IDENT,
      TOKENS.PLUS,
      TOKENS.IDENT,
      TOKENS.SEMICOLON,
      TOKENS.RBRACE,
      TOKENS.SEMICOLON,
      TOKENS.LET,
      TOKENS.IDENT,
      TOKENS.ASSIGN,
      TOKENS.IDENT,
      TOKENS.LPAREN,
      TOKENS.IDENT,
      TOKENS.COMMA,
      TOKENS.IDENT,
      TOKENS.RPAREN,
      TOKENS.SEMICOLON,
    ];

    const lexer = new Lexer(input);

    for (let index = 0; index < output.length; index++) {
      expect(lexer.nextToken().type).toBe(output[index]);
    }
  });
});
