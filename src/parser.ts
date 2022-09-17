import {
  Expression,
  Identifier,
  LetStatement,
  ProgramNode,
  ReturnStatement,
  Statement,
} from './ast';
import { Lexer } from './lexer';
import { Token, TOKENS, TokenType } from './token';

type PrefixParseFn = () => Expression;
type InfixParseFn = (expression: Expression) => Expression;

export class Parser {
  l: Lexer;
  private curToken: Token;
  private peekToken: Token;
  errors: string[] = [];

  private prefixParseFns: Record<TokenType, PrefixParseFn> = {};
  private infixParseFns: Record<TokenType, InfixParseFn> = {};

  constructor(l: Lexer) {
    this.l = l;
    this.curToken = this.l.nextToken();
    this.peekToken = this.l.nextToken();
  }

  private nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  private registerPrefixFn(tokenType: TokenType, fn: PrefixParseFn) {
    this.prefixParseFns[tokenType] = fn;
  }

  private registerInfixFn(tokenType: TokenType, fn: InfixParseFn) {
    this.infixParseFns[tokenType] = fn;
  }

  parse(): ProgramNode {
    const program = new ProgramNode();
    program.statements = [];

    while (this.curToken.type !== TOKENS.EOF) {
      const statement = this.parseStatement();
      if (statement) {
        program.statements.push(statement);
      }
      this.nextToken();
    }
    return program;
  }

  private parseStatement(): Statement | null {
    switch (this.curToken.type) {
      case TOKENS.LET: {
        return this.parseLetStatement();
      }

      case TOKENS.RETURN: {
        return this.parseReturnStatement();
      }

      default: {
        return null;
      }
    }
  }

  private currTokenIs(type: TokenType) {
    return type === this.curToken.type;
  }

  private peekTokenIs(type: TokenType) {
    return type === this.peekToken.type;
  }

  private peekError(type: TokenType) {
    const msg = `expected next token to be ${type}, got ${this.peekToken.type} instead`;
    this.errors.push(msg);
  }

  /**
   * Match the peekToken type with the given type and increments the currToken
   * if the token type matches
   *
   * @param type TokenType to match
   * @returns boolean
   */
  private expectPeek(type: TokenType) {
    if (this.peekTokenIs(type)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(type);
      return false;
    }
  }

  /**
   * Parses statements like `let x = 10;`
   */
  private parseLetStatement(): LetStatement | null {
    const token = this.curToken;

    // This also increaments the currtoken and thats why we storin in top

    if (!this.expectPeek(TOKENS.IDENT)) {
      return null;
    }

    const indentifier = new Identifier(this.curToken.literal, this.curToken);

    // next should be equals sign

    if (!this.expectPeek(TOKENS.ASSIGN)) {
      return null;
    }

    // TODO: Implement
    while (!this.currTokenIs(TOKENS.SEMICOLON)) {
      this.nextToken();
    }

    const statement = new LetStatement(token, indentifier);

    return statement;

    // const statement = new LetStatement(this.curToken, )
  }

  /**
   * Parses return statements like `return 5;`
   * @todo Implement return logic;
   * @returns lol returns a return statement
   */
  private parseReturnStatement(): ReturnStatement | null {
    const token = this.curToken;

    // TODO: Implement
    while (!this.currTokenIs(TOKENS.SEMICOLON)) {
      this.nextToken();
    }
    const statement = new ReturnStatement(token);
    return statement;
  }
}
