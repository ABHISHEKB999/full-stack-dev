import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskFilter } from '../views';

describe('TaskFilter Component', () => {
  test('renders TaskFilter component', () => {
    render(<TaskFilter />);

    expect(screen.getByLabelText(/filter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  test('handles filter changes', () => {
    const mockOnFilterChange = jest.fn();
    render(<TaskFilter onFilterChange={mockOnFilterChange} />);

    fireEvent.change(screen.getByLabelText(/filter/i), {
      target: { value: 'completed' },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });

  test('handles search input changes', () => {
    const mockOnSearchChange = jest.fn();
    render(<TaskFilter onSearchChange={mockOnSearchChange} />);

    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'task' },
    });

    expect(mockOnSearchChange).toHaveBeenCalledWith('task');
  });
});
