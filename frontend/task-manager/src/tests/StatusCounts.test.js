import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusCounts } from '../views';

describe('StatusCounts Component', () => {
  test('renders StatusCounts component', () => {
    render(
      <StatusCounts
        tasks={[
          { id: 1, status: 'completed' },
          { id: 2, status: 'pending' },
        ]}
      />
    );

    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });
});
