import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  expect(screen.getByRole('main') || screen.getByText(/parking/i) || screen.getByText(/login/i) || screen.getByText(/register/i)).toBeInTheDocument();
});

test('app loads successfully', () => {
  render(<App />);
  expect(document.body).toBeInTheDocument();
});
