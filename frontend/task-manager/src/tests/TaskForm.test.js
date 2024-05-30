import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

jest.mock('firebase/firestore');

test('renders TaskForm and submits data correctly', () => {
  const addTask = jest.fn();
  render(<TaskForm addTask={addTask} />);

  const titleInput = screen.getByLabelText(/title/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const statusSelect = screen.getByLabelText(/status/i);
  const dueDateInput = screen.getByLabelText(/due date/i);
  const submitButton = screen.getByRole('button', { name: /add task/i });

  fireEvent.change(titleInput, { target: { value: 'Test Task' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
  fireEvent.change(statusSelect, { target: { value: 'In Progress' } });
  fireEvent.change(dueDateInput, { target: { value: '2023-12-31' } });

  fireEvent.click(submitButton);

  expect(addTask).toHaveBeenCalledWith({
    title: 'Test Task',
    description: 'Test Description',
    status: 'In Progress',
    dueDate: '2023-12-31'
  });
});
