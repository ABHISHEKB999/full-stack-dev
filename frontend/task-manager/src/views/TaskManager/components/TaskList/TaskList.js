import React from 'react';
import PropTypes from 'prop-types';
import { Task } from './components';

const getStatusIndicatorColor = (status) => {
  switch (status) {
    case 'Done':
      return '4px solid green';
    case 'In Progress':
      return '4px solid blue';
    case 'To Do':
      return '4px solid orange';
    default:
      return '4px solid black'; // Default color
  }
};

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="max-h-96 overflow-y-auto dark:bg-gray-800">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-wrapper"
          style={{ borderLeft: getStatusIndicatorColor(task.status) }}
        >
          <Task task={task} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
