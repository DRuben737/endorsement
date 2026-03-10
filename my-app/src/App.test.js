import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site title in navigation', async () => {
  render(<App />);
  const linkElement = await screen.findByRole('link', { name: /pilotseal tools/i });
  expect(linkElement).toBeInTheDocument();
});
