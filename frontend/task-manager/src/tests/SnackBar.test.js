import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SnackBar } from '../views';

describe('SnackBar Component', () => {
  test('renders SnackBar component', () => {
    render(<SnackBar message="Task added successfully!" />);

    expect(screen.getByText(/task added successfully!/i)).toBeInTheDocument();
  });

  test('auto hides after timeout', async () => {
    render(
      <SnackBar message="Task added successfully!" autoHideDuration={1000} />
    );

    await waitFor(
      () => expect(screen.queryByText(/task added successfully!/i)).toBeNull(),
      { timeout: 2000 }
    );
  });
});
