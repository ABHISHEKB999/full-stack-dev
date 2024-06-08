import React from 'react';

const TaskRemindersAndDueDates = ({ dueDates }) => {
    // Sort due dates in ascending order
    const sortedDueDates = dueDates.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    // Get the two upcoming due dates
    const upcomingDueDates = sortedDueDates.slice(0, 2);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Upcoming Due Dates</h2>
            <ul className="divide-y divide-gray-200">
                {upcomingDueDates.map((task, index) => (
                    <li key={index} className="py-2">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-6-8a8 8 0 100 16 8 8 0 000-16zm-1 15v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5 9a1 1 0 00-1-1H2a1 1 0 100 2h2a1 1 0 001-1zm2-5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-900">{task.title}</p>
                                <p className="text-xs text-gray-500">{task.dueDate}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskRemindersAndDueDates;
