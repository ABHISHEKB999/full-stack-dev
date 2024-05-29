import React, { useState } from 'react';

const TaskFilter = ({ filterStatus, setFilterStatus, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filter">Filter by Status</label>
        <select id="filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">Search Tasks</label>
        <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sort">Sort by</label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="None">None</option>
          <option value="DueDate">Due Date</option>
          <option value="Title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
