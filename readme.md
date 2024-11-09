# File Management API

## Description

File Management API is a backend service built with Node.js and Express to handle file management operations. This includes uploading, organizing, tagging, sharing files, and retrieving detailed statistics. The application uses MongoDB for data storage and JWT for secure authentication, ensuring that only authorized users can interact with their files. Designed to integrate seamlessly with a frontend client, this API provides a comprehensive backend solution for file management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Installation

To set up the project locally, clone the repository and install the required dependencies:

```bash
git clone https://github.com/salmanbukhari37/file-management-api.git
cd file-management-api
```

## Usage

Run the Project in Development Mode

```
yarn dev
```

This command uses ts-node-dev to start the application with live reload.

### Build the project

```
yarn build
```

This command compiles the TypeScript files into JavaScript.

### Run in Production Mode:

```
yarn start
```

## Dependencies

This project uses the following dependencies:

- cors: Middleware for enabling CORS (Cross-Origin Resource Sharing)
- dotenv: Module for loading environment variables from a .env file
- express: Web framework for building the server
- jsonwebtoken: For JWT-based authentication
- mongoose: MongoDB object modeling tool for Node.js
- multer: Middleware for handling file uploads

## Development Dependencies

- @types/cors: Type definitions for cors
- @types/express: Type definitions for express
- @types/node: Type definitions for Node.js
- nodemon: Utility for automatically restarting the server during development
- ts-node-dev: TypeScript development server with live reload
- typescript: TypeScript language for building the application
