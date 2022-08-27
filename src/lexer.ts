import { KEYWORDS, Token, TokenKeys, TOKENS, TokenType } from './token.js';

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

  private readIdentifier() {
    const startPosition = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.substring(startPosition, this.position);
  }

  private isLetter(ch: string) {
    return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_';
  }

  private skipWhitespace() {
    const isWhitespace = (ch) =>
      ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r';

    while (isWhitespace(this.ch)) {
      this.readChar();
    }
  }

  /**
   * Function checks the type of given indentifier
   * @param str
   */
  private lookupIdentifier(str: string): TokenType {
    const keyword = KEYWORDS[str];

    // If not found in the record return as identifier
    return keyword ?? TOKENS.IDENT;
  }

  private readNumber() {
    const start = this.position;

    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.substring(start, this.position);
  }

  private isDigit(ch: string) {
    return '0' <= ch && ch <= '9';
  }

  private peekChar() {
    if (this.position > this.input.length) {
      return null;
    }
    return this.input[this.position + 1];
  }

  public nextToken() {
    let token: Token;

    this.skipWhitespace();

    Object.keys(TOKENS).every((tokenKey: TokenKeys) => {
      if (this.ch === TOKENS[tokenKey].toLowerCase()) {
        // Some special casses of muli-character tokens like "==" & "!="
        // No we are not supporting "==="

        if (this.ch === TOKENS.ASSIGN && this.peekChar() === '=') {
          token = new Token(TOKENS.EQ, '==');
          this.readChar(); // reads the "="
          this.readChar(); // prepares for next toke
          return false;
        }

        if (this.ch === TOKENS.BANG && this.peekChar() === '=') {
          token = new Token(TOKENS.NOT_EQ, '!=');
          this.readChar(); // reads the "="
          this.readChar(); // prepares for next token
          return false;
        }

        token = new Token(TOKENS[tokenKey], this.ch);
        this.readChar();
        return false;
      }

      return true;
    });

    // Default case
    if (!token) {
      if (this.ch === null) {
        token = new Token(TOKENS.EOF, '');
        return token;
      }

      // if its letter read it is as identifier
      if (this.isLetter(this.ch)) {
        const ident = this.readIdentifier();
        token = new Token(this.lookupIdentifier(ident), ident);
      } else if (this.isDigit(this.ch)) {
        // if its a digit woho, read one,
        token = new Token(TOKENS.INT, this.readNumber());
      } else {
        token = new Token(TOKENS.ILLEGAL, this.ch);
      }

      // token = new Token(TOKENS.EOF, '');
    }

    return token;
  }
}
