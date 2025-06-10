# Learning Management System

A simple React and Vite project for managing courses and users.

The project now includes a Spring Boot backend configured to use a MySQL
database. Ensure MySQL (or MariaDB) is running locally and update the
`application.properties` file if your credentials differ from the defaults.

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
