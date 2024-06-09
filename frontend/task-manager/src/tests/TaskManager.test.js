import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskManager from '../views/TaskManager';

describe('TaskManager Component', () => {
  test('renders TaskManager component', () => {
    render(<TaskManager />);

    expect(screen.getByText(/task manager/i)).toBeInTheDocument();
    expect(screen.getByText(/task list/i)).toBeInTheDocument();
    expect(screen.getByText(/task form/i)).toBeInTheDocument();
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  test('fetches tasks on mount', async () => {
    const mockFetchTasks = jest.fn().mockResolvedValue([]);
    render(<TaskManager fetchTasks={mockFetchTasks} />);

    await waitFor(() => expect(mockFetchTasks).toHaveBeenCalled());
  });

  test('adds a new task', async () => {
    const mockAddTask = jest.fn().mockResolvedValue({});
    render(<TaskManager addTask={mockAddTask} />);

    fireEvent.change(screen.getByLabelText(/task name/i), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() =>
      expect(mockAddTask).toHaveBeenCalledWith({ name: 'New Task' })
    );
  });

  test('updates a task', async () => {
    const mockUpdateTask = jest.fn().mockResolvedValue({});
    render(
      <TaskManager
        updateTask={mockUpdateTask}
        tasks={[{ id: 1, name: 'Task 1' }]}
      />
    );

    fireEvent.change(screen.getByLabelText(/task name/i), {
      target: { value: 'Updated Task' },
    });
    fireEvent.click(screen.getByRole('button', { name: /update task/i }));

    await waitFor(() =>
      expect(mockUpdateTask).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Task',
      })
    );
  });

  test('deletes a task', async () => {
    const mockDeleteTask = jest.fn().mockResolvedValue({});
    render(
      <TaskManager
        deleteTask={mockDeleteTask}
        tasks={[{ id: 1, name: 'Task 1' }]}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));

    await waitFor(() => expect(mockDeleteTask).toHaveBeenCalledWith(1));
  });
});
