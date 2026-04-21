import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from "../src/App";

test('Test first react aap case', () => {
  render(<App />);
  //const text = screen.getByText("Welcome");
  expect(screen.getByText(/Welcome/i)).toBeTruthy();
});