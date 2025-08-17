import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task manager app', () => {
  render(<App />);
  const linkElement = screen.getByText(/task manager/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login form', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('renders register link', () => {
  render(<App />);
  const registerLink = screen.getByText(/register/i);
  expect(registerLink).toBeInTheDocument();
});
