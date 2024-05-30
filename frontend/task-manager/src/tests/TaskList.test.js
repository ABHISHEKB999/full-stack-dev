import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

jest.mock('firebase/firestore');

test('renders TaskList and interacts with tasks', () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do', dueDate: '2023-12-31' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress', dueDate: '2023-12-31' }
  ];
  const updateTask = jest.fn();
  const deleteTask = jest.fn();

  render(<TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />);

  const taskTitles = screen.getAllByText(/task/i);
  expect(taskTitles.length).toBe(2);

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  fireEvent.click(deleteButtons[0]);
  expect(deleteTask).toHaveBeenCalledWith(1);
});
