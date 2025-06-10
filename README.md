# Learning Management System

A simple React and Vite project for managing courses and users.

## Installation

```bash
npm install
```

## Development server

```bash
npm run dev
```

## Production build

```bash
npm run build
```

Ensure the Vite configuration includes the React plugin to prevent build-time
errors such as `React is not defined`.

## Backend (Spring Boot)

The backend is a Spring Boot application that uses MySQL Community Edition (or
MariaDB) for persistence.

1. Start a MySQL or MariaDB server and create a database named `lms`.
2. Update `backend/src/main/resources/application.properties` with your database
   username and password.
3. From the `backend` directory, run the application:

```bash
mvn spring-boot:run
```
