import { LetStatement, ReturnStatement } from '../src/ast';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { TOKENS } from '../src/token';

const testLetStatements = (statement: LetStatement, value: string) => {
  expect(statement.tokenLiteral().toUpperCase()).toBe(TOKENS.LET);
  expect(statement.name.value).toBe(value);
  expect(statement.name.tokenLiteral()).toBe(value);
};

const testReturnStatements = (statement: ReturnStatement) => {
  expect(statement.tokenLiteral().toUpperCase()).toBe(TOKENS.RETURN);
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
});
