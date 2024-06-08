import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {tasks.map(task => (
        <div key={task.id} className="task-wrapper" style={{borderLeft: getStatusIndicatorColor(task.status)}}>
          <Task task={task} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      ))}
    </div>
  );
};

const getStatusIndicatorColor = (status) => {
  switch(status) {
    case 'Done':
      return '4px solid green';
    case 'In Progress':
      return '4px solid blue';
    case 'To Do':
      return '4px solid orange';
    default:
      return '4px solid black'; // Default color
  }
}

export default TaskList;
