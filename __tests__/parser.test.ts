import { LetStatement } from '../src/ast';
import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';
import { TOKENS } from '../src/token';

const testLetStatements = (statement: LetStatement, value: string) => {
  expect(statement.tokenLiteral().toUpperCase()).toBe(TOKENS.LET);
  expect(statement.name.value).toBe(value);
  expect(statement.name.tokenLiteral()).toBe(value);
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

    const program = parser.parse();

    expect(program).toBeDefined();

    expect(program.statements.length).toBe(3);

    const letStatementValues = ['x', 'y', 'foobar'];

    program.statements.forEach((statement, i) =>
      testLetStatements(statement as LetStatement, letStatementValues[i]),
    );
  });
});
