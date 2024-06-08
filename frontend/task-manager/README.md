# Task Manager App

A web-based task management application built with React.js and Firebase, allowing users to create, update, and delete tasks. Users can also filter and sort tasks based on different criteria and manage their avatar images.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up, log in, and log out securely using Firebase Authentication.
- **Task Management**: Users can create, update, and delete tasks. Tasks can have titles, descriptions, due dates, and statuses.
- **Task Filtering and Sorting**: Users can filter tasks based on their status (e.g., All, Completed, In Progress) and search tasks by title. They can also sort tasks by due date or title.
- **Avatar Management**: Users can upload and manage their avatar images, which are stored in Firebase Storage.
- **Responsive Design**: The application is responsive and works well on different screen sizes and devices.

## Technologies Used

- **React.js**: Frontend library for building user interfaces.
- **Firebase**: Backend-as-a-Service platform for authentication, database, and storage.
- **Firebase Authentication**: For user authentication.
- **Firebase Firestore**: A NoSQL cloud database for storing task data.
- **Firebase Storage**: Cloud storage for storing user avatar images.
- **Tailwind CSS**: Utility-first CSS framework for styling the UI.
- **React Router**: For client-side routing.

## Setup Instructions

1. Clone the repository:

git clone https://github.com/yourusername/task-manager-app.git

2. Install dependencies:

cd task-manager-app
npm install


3. Create a Firebase project and set up Firebase Authentication, Firestore, and Storage. Update the Firebase configuration in `src/firebase.js` with your project credentials.

4. Run the application:

npm start


5. Open the application in your browser at `http://localhost:3000`.

## Usage

- **Sign Up/Login**: Create a new account or log in with an existing account.
- **Task Management**: Create, update, and delete tasks using the form provided.
- **Filtering and Sorting**: Use the filters and sorting options to organize tasks based on status, due date, or title.
- **Avatar Management**: Upload and manage your avatar image by clicking on your profile icon.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for any bugs, feature requests, or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
