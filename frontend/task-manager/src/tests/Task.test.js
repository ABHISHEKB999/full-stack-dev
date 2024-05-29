import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../components/Task';

jest.mock('firebase/firestore');

describe('Task Component', () => {
  const task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'To Do',
    dueDate: '2023-12-31'
  };
  const updateTask = jest.fn();
  const deleteTask = jest.fn();

  beforeEach(() => {
    render(<Task task={task} updateTask={updateTask} deleteTask={deleteTask} />);
  });

  test('renders task details correctly', () => {
    const titleElement = screen.getByText(/test task/i);
    const descriptionElement = screen.getByText(/test description/i);
    const dueDateElement = screen.getByText(/due: 2023-12-31/i);
    const statusSelect = screen.getByRole('combobox');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dueDateElement).toBeInTheDocument();
    expect(statusSelect.value).toBe('To Do');
  });

  test('handles status update correctly', () => {
    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'Done' } });
    expect(updateTask).toHaveBeenCalledWith({ ...task, status: 'Done' });
  });

  test('handles task deletion correctly', () => {
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(deleteTask).toHaveBeenCalledWith(1);
  });

  test('renders different status correctly', () => {
    const newTask = { ...task, status: 'In Progress' };
    render(<Task task={newTask} updateTask={updateTask} deleteTask={deleteTask} />);
    const statusSelect = screen.getByRole('combobox');
    expect(statusSelect.value).toBe('In Progress');
  });

  test('handles missing task props gracefully', () => {
    render(<Task task={{}} updateTask={updateTask} deleteTask={deleteTask} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(deleteTask).toHaveBeenCalledTimes(1); // Should not throw an error
  });
});
