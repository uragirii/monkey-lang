import { Token } from './token';

export class Node {
  tokenLiteral(): string {
    throw new Error('Not implemented');
  }
  toString(): string {
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
  toString(): string {
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

  constructor(statements: Statement[] = []) {
    super();
    this.statements = statements;
  }

  tokenLiteral() {
    return this.statements[0].tokenLiteral() ?? '';
  }
  toString() {
    return this.statements.map((statement) => statement.toString()).join();
  }
}

export class Identifier extends Expression {
  token: Token;
  value: string;

  constructor(value: string, token: Token) {
    super();
    this.value = value;
    this.token = token;
  }

  toString(): string {
    return this.value;
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
  value: Expression | null = null;

  constructor(token: Token, name: Identifier, value?: Expression) {
    super();
    this.token = token;
    this.name = name;
    this.value = value ?? null;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  toString(): string {
    return `${this.tokenLiteral()} ${this.name} = ${this.value ?? ''};`;
  }
}

export class ReturnStatement extends Statement {
  token: Token;
  returnValue: Expression | null = null;

  constructor(token: Token, value?: Expression) {
    super();
    this.token = token;
    this.returnValue = value ?? null;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  toString(): string {
    return `${this.tokenLiteral()} ${this.returnValue ?? ''} ;`;
  }
}

export class ExpressionStatement extends Statement {
  token: Token;
  expression: Expression | null = null;

  constructor(token: Token, expression?: Expression) {
    super();
    this.token = token;
    this.expression = expression ?? null;
  }

  toString(): string {
    return this.expression?.toString() ?? '';
  }
}
