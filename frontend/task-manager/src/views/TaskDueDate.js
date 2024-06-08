import React from 'react';

const TaskDueDate = ({ dueDate }) => {
    // Function to format due date
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM1 7a1 1 0 011-1h4a1 1 0 110 2H2a1 1 0 01-1-1zm-1 6a1 1 0 011-1h14a1 1 0 110 2H1a1 1 0 01-1-1zM9 0a1 1 0 011 1v7a1 1 0 11-2 0V1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>{formatDate(dueDate)}</span>
        </div>
    );
};

export default TaskDueDate;
