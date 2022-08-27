import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { Lexer } from './lexer.js';

const rl = readline.createInterface({ input, output });

const ask = (str: string): Promise<string> => {
  return new Promise((resolve) => {
    return rl.question(str, resolve);
  });
};

rl.on('SIGINT', () => {
  rl.close();
});

rl.on('close', () => {
  process.exit(0);
});

console.log(`Welcome to 🐒 Lang v0.0.1.\nPress Cntrl+C to exit.\n`);

while (true) {
  try {
    const input = await ask('>> ');
    const lexer = new Lexer(input);
    lexer.debug();
  } catch (error) {
    console.log('Something went wrong. Exiting Monkey REPL.');
    break;
  }
}

rl.close();
