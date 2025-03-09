Task Manager Application
A full-stack task management app built with React (frontend) and Node.js + Express + MongoDB (backend). Users can sign up, log in, and manage tasks with CRUD operations, search functionality, and more.

Features
User Authentication: Sign up and log in with JWT-based authentication.

Task Management: Create, read, update, and delete tasks.

Search Tasks: Search tasks by title.

Responsive Design: Works on both mobile and desktop.

Styling: Clean and modern UI with custom CSS and Bootstrap.

Technologies Used
Frontend: React, Bootstrap, Axios

Backend: Node.js, Express, MongoDB, Mongoose, JWT

Styling: Custom CSS, Bootstrap

Deployment: Vercel (Frontend), Render/Heroku (Backend)

How We Built It
1. Backend Development
Setup:

Created a Node.js app with Express.

Used MongoDB for the database and Mongoose for schema modeling.

Implemented JWT-based authentication for secure user login.

API Endpoints:

Auth: /api/auth/register, /api/auth/login

Tasks: /api/tasks, /api/tasks/search

Validation:

Used express-validator for input validation in registration, login, and task creation.

Search Functionality:

Added a search endpoint (/api/tasks/search) to filter tasks by title.

2. Frontend Development
Setup:

Created a React app using create-react-app.

Used React Router for navigation between pages (Login, Register, Dashboard).

Components:

Navbar: Navigation bar with links to Dashboard, Login, and Register.

TaskForm: Form to create or update tasks.

TaskList: Displays a list of tasks with details (title, description, priority, status).

SearchTasks: Allows users to search tasks by title.

Styling:

Used Bootstrap for pre-built components and custom CSS for a modern look.

Added hover effects, badges for priority levels, and responsive design.

Integration:

Connected the frontend to the backend using Axios for API calls.

Stored JWT tokens in localStorage for authenticated requests.

Setup Instructions
1. Backend Setup
Clone the repository:

bash
Copy
git clone <repository-url>
cd task-manager-backend
Install dependencies:

bash
Copy
npm install
Create a .env file in the root directory and add:

Copy
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000
Start the backend server:

bash
Copy
npm start
The backend will run on http://localhost:7070.

2. Frontend Setup
Navigate to the frontend directory:

bash
Copy
cd task-manager-frontend
Install dependencies:

bash
Copy
npm install
Start the React app:

bash
Copy
npm start
The frontend will run on http://localhost:3000.


Challenges Faced
Implementing JWT authentication securely.

Ensuring responsive design for mobile and desktop.

Handling form validation and error messages.