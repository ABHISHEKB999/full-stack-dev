import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = (e) => {
    updateTask({ ...task, status: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-2">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {task.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Due: {task.dueDate}
      </p>
      <div className="flex justify-between items-center mt-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 dark:text-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded dark:bg-red-700"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
