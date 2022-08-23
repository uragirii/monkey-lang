import { add } from '../src/main.js';

describe('add function workds', () => {
  // Assert if setTimeout was called properly
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
