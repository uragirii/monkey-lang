import { Token, TokenKeys, TOKENS } from './token.js';

export class Lexer {
  input: string;
  position = 0; // current position in input (points to current char)
  readPosition = 0; // current reading position in input (after current char)
  ch: string; // current char under examination

  constructor(input: string) {
    this.input = input;

    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = null;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  public nextToken() {
    let token: Token;

    Object.keys(TOKENS).every((tokenKey: TokenKeys) => {
      if (this.ch === TOKENS[tokenKey]) {
        token = new Token(TOKENS[tokenKey], this.ch);
        return false;
      }

      return true;
    });

    if (!token) {
      token = new Token(TOKENS.EOF, '');
    }

    this.readChar();
    return token;
  }
}
