# week4-day2
Task Management System with NgRx and .NET Microservices

This project is a Task Management System where users can create, update, delete, and view tasks. The frontend is built using Angular with NgRx for state management, while the backend is implemented as microservices in .NET Core Web API. Swagger is used for API testing.


Installation and Setup

Frontend Setup (Angular + NgRx)

Clone the repository and navigate to the frontend folder:

git clone https://github.com/Razan-Alahmadi/week4-day2.git
cd frontend

Install dependencies:

npm install

Run the Angular application:

ng serve

Backend Setup (.NET Core Web API)

Navigate to the backend folder:

cd backend/TaskService

Restore dependencies and build the project:

dotnet restore
dotnet build

Run the application:

dotnet run

Access Swagger API documentation at:

http://localhost:<port>/swagger

API Endpoints 

GET /api/tasks - Get all tasks

POST /api/tasks - Create a new task

PUT /api/tasks/{id} - Update a task

DELETE /api/tasks/{id} - Delete a task
