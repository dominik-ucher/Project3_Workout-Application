import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('renders the correct navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Check that the Home link is present
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check that the "My exercises" link is present and has the correct URL
    const link = screen.getByText('My exercises');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/exercises');
  });
});