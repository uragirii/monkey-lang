import {
  Expression,
  ExpressionStatement,
  Identifier,
  IntegerLiteral,
  LetStatement,
  PrefixExpression,
  ProgramNode,
  ReturnStatement,
  Statement,
} from './ast';
import { Lexer } from './lexer';
import { Priority } from './priority';
import { Token, TOKENS, TokenType } from './token';

type PrefixParseFn = () => Expression | null;
type InfixParseFn = (expression: Expression) => Expression;

export class Parser {
  l: Lexer;
  private curToken: Token;
  private peekToken: Token;
  errors: string[] = [];

  private prefixParseFns: Map<TokenType, PrefixParseFn> = new Map();
  private infixParseFns: Map<TokenType, InfixParseFn> = new Map();

  constructor(l: Lexer) {
    this.l = l;
    this.curToken = this.l.nextToken();
    this.peekToken = this.l.nextToken();

    this.registerPrefixFn(TOKENS.IDENT, this.parseIdentifierExpression);
    this.registerPrefixFn(TOKENS.INT, this.parseIntegerLiteralExpression);
    this.registerPrefixFn(TOKENS.BANG, this.parsePrefixExpression);
    this.registerPrefixFn(TOKENS.MINUS, this.parsePrefixExpression);
  }

  private nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  private registerPrefixFn(tokenType: TokenType, fn: PrefixParseFn) {
    this.prefixParseFns.set(tokenType, fn);
  }

  private registerInfixFn(tokenType: TokenType, fn: InfixParseFn) {
    this.infixParseFns.set(tokenType, fn);
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
        return this.parseExpressionStatement();
      }
    }
  }

  private parseExpressionStatement(): ExpressionStatement | null {
    const expression = new ExpressionStatement(this.curToken);

    expression.expression = this.parseExpression(Priority.LOWEST);
    if (this.peekTokenIs(TOKENS.SEMICOLON)) {
      this.nextToken();
    }

    return expression;
  }

  private parseIdentifierExpression = (): Identifier => {
    return new Identifier(this.curToken.literal, this.curToken);
  };

  private parseIntegerLiteralExpression = (): IntegerLiteral | null => {
    const token = this.curToken;
    try {
      const value = parseInt(token.literal);
      return new IntegerLiteral(token, value);
    } catch (error) {
      const msg = `Cannot parse ${token.literal} as Integer`;
      this.errors.push(msg);
      return null;
    }
  };

  private parsePrefixExpression = (): PrefixExpression => {
    const token = this.curToken;

    const expression = new PrefixExpression(token, token.literal);

    this.nextToken();

    expression.right = this.parseExpression(Priority.PREFIX);
    return expression;
  };

  private noPrefixParseFnError(type: TokenType) {
    const msg = `parse error : Cannot find a prefix parse function to parse '${type}'`;
    this.errors.push(msg);
  }

  private parseExpression(
    priority: Priority = Priority.LOWEST,
  ): Expression | null {
    const prefixFn = this.prefixParseFns.get(this.curToken.type);

    if (!prefixFn) {
      this.noPrefixParseFnError(this.curToken.type);
      return null;
    }

    const leftExp = prefixFn();

    return leftExp;
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
