import { Lexer } from '../src/lexer';
import { Parser } from '../src/parser';

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
  });
});
