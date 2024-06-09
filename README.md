# Task Management Application

## Introduction

This is a simple task management application that allows users to create, update, and delete tasks. Tasks have a title, description, status (e.g., "To Do," "In Progress," "Done"), and a due date. Users can also filter tasks by status, search for tasks, sort them, and manage their profiles.

## Features

- **Task Management**: Create, update, delete tasks.
- **Filtering**: Filter tasks by status.
- **Sorting and Searching**: Sort tasks by different criteria and search tasks.
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Responsive Design**: Works on both desktop and mobile devices.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Firebase**: Backend-as-a-Service for authentication and Firestore for database.

### Backend

- **Firebase Firestore**: NoSQL database for storing task data.
- **Firebase Authentication**: Authentication service for user management.

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- Firebase account and project set up.

### Installation

1. Clone the repository:

git clone https://github.com/your-username/task-management-app.git
cd task-management-app

2. Install dependencies:
npm install

3. Create a .env file in the root of the project and add your Firebase configuration:
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

# Running the Application
## To run the application locally: 
- npm start

# Testing
## To run the tests: 
- npm test

# Project Structure

- **`/src`**: This is the main source directory for the application.
  - **`/views`**: This directory contains view components that represent different pages or sections of the application.
    - **`TaskManager/`**: A directory for the TaskManager view.
      - `TaskManager.js`: The main component for the TaskManager view.
      - **`/components`**: This directory contains the reusable React components used in the application.
        - `TaskForm.js`: A component for creating and updating tasks.
        - `Task.js`: A component for displaying individual task details with options to update or delete.
        - `TaskList.js`: A component for displaying a list of tasks.
        - `TaskFilter.js`: A component for filtering tasks by status, search term, and sort criteria.
        - `SignOut.js`: A component for rendering a button that allows users to sign out of the application.
     - **`SignIn/`**: A directory for the SignIn view.
     - **`SignUp/`**: A directory for the SignUp view.
  - **`/__mocks__`**: This directory contains mock implementations for external dependencies.
    - `firebase.js`: A mock implementation for Firebase services, used for testing purposes.
  - **`/tests`**: This directory contains test files for the components.
    - `TaskForm.test.js`: Test file for the `TaskForm` component.
    - `Task.test.js`: Test file for the `Task` component.
    - `TaskList.test.js`: Test file for the `TaskList` component.
    - `TaskFilter.test.js`: Test file for the `TaskFilter` component.
    - `SignOut.test.js`: Test file for the `SignOut` component.
  - `index.js`: The entry point of the application.
  - `App.js`: The main component that serves as the root of the application.
  - `jest.setup.js`: Configuration file for the Jest testing framework.


  # Components
TaskForm: Form for creating and updating tasks.
Task: Displays individual task details with options to update or delete.
TaskList: Displays a list of tasks.
TaskFilter: Filters tasks by status, search term, and sort criteria.
UserProfile: Displays and updates user profile information.
Mocking Firebase
The __mocks__/firebase.js file mocks Firebase services to isolate and test components without actual Firebase dependencies.

# Jest Setup
The jest.setup.js file includes polyfills and mocks for the testing environment.

# Test Cases
TaskForm.test.js: Tests for the TaskForm component.
Task.test.js: Tests for the Task component.
TaskList.test.js: Tests for the TaskList component.
TaskFilter.test.js: Tests for the TaskFilter component.
UserProfile.test.js: Tests for the UserProfile component.

# Additional Features
## User Authentication
Firebase Authentication is used for user sign-up, login, and management.

## Task Due Dates
Tasks can have due dates, which are displayed and managed in the application.

## Sorting and Searching
Tasks can be sorted by title, due date, or status, and searched by keywords.

## User Profiles
Users can manage their profiles, including updating their display name and avatar.

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any features, enhancements, or bug fixes.

## License
This project is licensed under the MIT License.



This `README.md` file provides an overview of the project, installation and setup instructions, project structure, and testing details. It should help others understand the project and get started with it quickly. Make sure to replace `your-username` and other placeholders with your actual information.









