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

  it('checks for <> ! * true if else', () => {
    const input = `!-/*5;
    5 < 10 > 5;
    if (5 < 10) {
      return true;
  } else {
      return false;
}
    `;
    const output = [
      TOKENS.BANG,
      TOKENS.MINUS,
      TOKENS.SLASH,
      TOKENS.ASTERISK,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.INT,
      TOKENS.LT,
      TOKENS.INT,
      TOKENS.GT,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.IF,
      TOKENS.LPAREN,
      TOKENS.INT,
      TOKENS.LT,
      TOKENS.INT,
      TOKENS.RPAREN,
      TOKENS.LBRACE,
      TOKENS.RETURN,
      TOKENS.TRUE,
      TOKENS.SEMICOLON,
      TOKENS.RBRACE,
      TOKENS.ELSE,
      TOKENS.LBRACE,
      TOKENS.RETURN,
      TOKENS.FALSE,
      TOKENS.SEMICOLON,
      TOKENS.RBRACE,
    ];

    const lexer = new Lexer(input);

    for (let index = 0; index < output.length; index++) {
      expect(lexer.nextToken().type).toBe(output[index]);
    }
  });

  it('checks for two character tokens like == and !=', () => {
    const input = `10 == 10; 10 != 9;`;
    const output = [
      TOKENS.INT,
      TOKENS.EQ,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.INT,
      TOKENS.NOT_EQ,
      TOKENS.INT,
      TOKENS.SEMICOLON,
      TOKENS.EOF,
    ];
    const lexer = new Lexer(input);

    for (let index = 0; index < output.length; index++) {
      expect(lexer.nextToken().type).toBe(output[index]);
    }
  });
});
