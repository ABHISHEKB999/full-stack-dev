import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilter from '../components/TaskFilter';

jest.mock('firebase/firestore');

test('renders TaskFilter and handles changes', () => {
  const setFilterStatus = jest.fn();
  const setSearchTerm = jest.fn();
  const setSortBy = jest.fn();

  render(<TaskFilter filterStatus="All" setFilterStatus={setFilterStatus} searchTerm="" setSearchTerm={setSearchTerm} sortBy="None" setSortBy={setSortBy} />);

  const filterSelect = screen.getByLabelText(/filter by status/i);
  const searchInput = screen.getByLabelText(/search tasks/i);
  const sortSelect = screen.getByLabelText(/sort by/i);

  fireEvent.change(filterSelect, { target: { value: 'In Progress' } });
  expect(setFilterStatus).toHaveBeenCalledWith('In Progress');

  fireEvent.change(searchInput, { target: { value: 'Task' } });
  expect(setSearchTerm).toHaveBeenCalledWith('Task');

  fireEvent.change(sortSelect, { target: { value: 'Title' } });
  expect(setSortBy).toHaveBeenCalledWith('Title');
});
