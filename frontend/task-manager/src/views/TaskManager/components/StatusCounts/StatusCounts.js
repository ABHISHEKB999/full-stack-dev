import React from 'react';
import PropTypes from 'prop-types';

const StatusCounts = ({ tasks }) => {
  const statusCounts = tasks.reduce((counts, task) => {
    counts[task.status] = (counts[task.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className="status-counts">
      <h2>Status Counts</h2>
      <ul>
        <li className="done">Done: {statusCounts.Done || 0}</li>
        <li className="in-progress">
          In Progress: {statusCounts['In Progress'] || 0}
        </li>
        <li className="to-do">To Do: {statusCounts['To Do'] || 0}</li>
      </ul>
    </div>
  );
};

StatusCounts.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
    })
  ).isRequired,
};

export default StatusCounts;
