import React from 'react';

const StatusCounts = ({ tasks }) => {
    // Count the number of tasks for each status
    const statusCounts = tasks.reduce((counts, task) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
        return counts;
    }, {});

    return (
        <div className="status-counts">
            <h2>Status Counts</h2>
            <ul>
                <li className="done">Done: {statusCounts['Done'] || 0}</li>
                <li className="in-progress">In Progress: {statusCounts['In Progress'] || 0}</li>
                <li className="to-do">To Do: {statusCounts['To Do'] || 0}</li>
            </ul>
        </div>
    );
};

export default StatusCounts;
