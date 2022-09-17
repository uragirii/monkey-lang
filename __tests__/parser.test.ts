import {
  ExpressionStatement,
  Identifier,
  IntegerLiteral,
  LetStatement,
  PrefixExpression,
  ProgramNode,
  ReturnStatement,
} from '../src/ast';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { Token, TOKENS } from '../src/token';

const testLetStatements = (statement: LetStatement, value: string) => {
  expect(statement.tokenLiteral().toUpperCase()).toBe(TOKENS.LET);
  expect(statement.name.value).toBe(value);
  expect(statement.name.tokenLiteral()).toBe(value);
};

const testReturnStatements = (statement: ReturnStatement) => {
  expect(statement.tokenLiteral().toUpperCase()).toBe(TOKENS.RETURN);
};

const testIntegerLiteral = (identifier: IntegerLiteral, value: number) => {
  expect(identifier).toBeInstanceOf(IntegerLiteral);
  expect(identifier.value).toBe(value);
  expect(identifier.tokenLiteral()).toBe(value.toString());
};

const checkParseErrors = (parser: Parser) => {
  if (parser.errors.length === 0) {
    return;
  }

  const errors = parser.errors;

  console.log(
    `Parser has ${parser.errors.length} error${errors.length > 1 ? 's' : ''}`,
  );
  errors.forEach((error) => console.log(`parser error: ${error}`));
};

describe('tests parser', () => {
  it('tests with only let statements', () => {
    const input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
    `;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    checkParseErrors(parser);

    const program = parser.parse();

    expect(program).toBeDefined();

    expect(program.statements.length).toBe(3);

    const letStatementValues = ['x', 'y', 'foobar'];

    program.statements.forEach((statement, i) =>
      testLetStatements(statement as LetStatement, letStatementValues[i]),
    );
  });

  it('tests for errors while parsing', () => {
    const input = `
    let x 5;
    let y = 10;
    let foobar = 838383;
    `;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    parser.parse();

    // checkParseErrors(parser);

    expect(parser.errors.length).toBe(1);
  });

  it('tests for only return statements', () => {
    const input = `
    return 5;
    return 10;
    return 99212;
    `;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    checkParseErrors(parser);

    const program = parser.parse();

    expect(program).toBeDefined();

    expect(program.statements.length).toBe(3);

    program.statements.forEach((statement) =>
      testReturnStatements(statement as ReturnStatement),
    );
  });

  it('checks toString() implementation', () => {
    const program = new ProgramNode([
      new LetStatement(
        new Token(TOKENS.LET, 'let'),
        new Identifier('myVar', new Token(TOKENS.IDENT, 'myVar')),
        new Identifier('anotherVar', new Token(TOKENS.IDENT, 'anotherVar')),
      ),
    ]);

    expect(program.toString()).toBe('let myVar = anotherVar;');
  });

  it('tests identifier expression', () => {
    const input = 'foobar;';

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const program = parser.parse();

    checkParseErrors(parser);
    expect(parser.errors.length).toBe(0);
    expect(program.statements.length).toBe(1);

    const statement = program.statements[0] as ExpressionStatement;
    expect(statement).toBeInstanceOf(ExpressionStatement);

    const identifier = statement.expression as Identifier;

    expect(identifier).toBeInstanceOf(Identifier);
    expect(identifier.value).toBe('foobar');
    expect(identifier.tokenLiteral()).toBe('foobar');
  });

  it('tests integer literal expression', () => {
    const input = '5;';

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const program = parser.parse();

    checkParseErrors(parser);
    expect(parser.errors.length).toBe(0);
    expect(program.statements.length).toBe(1);

    const statement = program.statements[0] as ExpressionStatement;
    expect(statement).toBeInstanceOf(ExpressionStatement);

    const identifier = statement.expression as IntegerLiteral;

    testIntegerLiteral(identifier, 5);
  });

  it('tests for prefix expressions', () => {
    const prefixTests = [
      {
        input: '!5',
        operator: '!',
        value: 5,
      },
      {
        input: '-15',
        operator: '-',
        value: 15,
      },
    ];

    prefixTests.forEach((prefixTest) => {
      const { input, operator, value } = prefixTest;

      const lexer = new Lexer(input);
      const parser = new Parser(lexer);

      const program = parser.parse();

      checkParseErrors(parser);
      expect(parser.errors.length).toBe(0);
      expect(program.statements.length).toBe(1);

      const statement = program.statements[0] as ExpressionStatement;

      expect(statement).toBeInstanceOf(ExpressionStatement);
      const expression = statement.expression as PrefixExpression;

      expect(expression).toBeInstanceOf(PrefixExpression);
      expect(expression.operator).toBe(operator);
      testIntegerLiteral(expression.right as IntegerLiteral, value);
    });

    expect(true).toBe(true);
  });
});
