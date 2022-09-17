import { Token } from './token';

export class Node {
  tokenLiteral(): string {
    throw new Error('Not implemented');
  }
}

export class Statement extends Node {
  tokenLiteral() {
    return '';
  }
  statementNode() {
    throw new Error('Not implemented');
  }
}

export class Expression extends Node {
  tokenLiteral() {
    return '';
  }
  expressionNode() {
    throw new Error('Not implemented');
  }
}

export class ProgramNode extends Node {
  statements: Statement[] = [];
  tokenLiteral() {
    return this.statements[0].tokenLiteral() ?? '';
  }
}

export class Identifier extends Node {
  token: Token;
  value: string;

  constructor(value: string, token: Token) {
    super();
    this.value = value;
    this.token = token;
  }

  tokenLiteral() {
    return this.token.literal;
  }
}

export class LetStatement extends Statement {
  /**
   * The LET Token
   */
  token: Token;
  name: Identifier;
  value: Expression;

  constructor(token: Token, name: Identifier, value: Expression) {
    super();
    this.token = token;
    this.name = name;
    this.value = value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export class ReturnStatement extends Statement {
  token: Token;
  returnValue: Expression;

  constructor(token: Token, value: Expression) {
    super();
    this.token = token;
    this.returnValue = value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}
