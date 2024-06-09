import React from 'react';
import PropTypes from 'prop-types';

const SnackBar = ({ color, message }) => {
  return (
    <div
      className={`bg-${color}-100 dark:bg-${color}-800 border-l-4 border-${color}-500 dark:border-${color}-700 text-${color}-700 dark:text-${color}-100 p-4 rounded-md mb-4 fixed bottom-0 left-0 right-0`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 text-${color}-500 dark:text-${color}-100`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 6.414l-4.793 4.793a1 1 0 01-1.414-1.414l5-5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0L3.293 8.707a1 1 0 010-1.414l5-5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm">{`Task ${message} successfully!`}</p>
        </div>
      </div>
    </div>
  );
};

SnackBar.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default SnackBar;
