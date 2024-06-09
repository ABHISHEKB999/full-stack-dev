import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignOut from '../views/TaskManager/components/SignOut';

describe('SignOut Component', () => {
  test('renders SignOut component', () => {
    render(<SignOut />);

    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument();
  });

  test('handles sign out', () => {
    const mockOnSignOut = jest.fn();
    render(<SignOut onSignOut={mockOnSignOut} />);

    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    expect(mockOnSignOut).toHaveBeenCalled();
  });
});
