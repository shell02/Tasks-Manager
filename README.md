# Tasks-Manager

## Project
Build a task management application that allows users to create, update, delete, and prioritize tasks. The project will consist of a web application developed in React (for the frontend) and a backend API built with NestJS.

## Setup

Add this in a .env file in the backend directory.
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres_db

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres_db"
JSON_WEB_TOKEN="1234567890qwertyuiopasdfghjklzxcvbnm"
```

Then you can run this command ```docker-compose up --build```.

You may need to add "sudo" before docker-compose.
