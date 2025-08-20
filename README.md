# Eventura

**¡Warning!:** This file is being prepared and will be updated gradually and regularly. These instructions are intended for a user of Ubuntu.

## Description

Backend of event management project containerized with Docker and developed in Node.js and Express, with a MySQL relational database accessible with phpMyAdmin.

## Table of Contents

- [Local installation procedure](#local-installation-procedure)
- [Project architecture overview](#project-architecture-overview)
- [Docker services](#docker-services)
- [Contribution guidelines](#contribution-guidelines)
- [Deploying on VPS](#deploying-on-vps)
- [CI/CD Pipeline](#ci-cd-pipeline)
- [Data schema](#data-schema)
- [Database](#database)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Testing the API with Insomnia](#testing-the-api-with-insomnia)

## Local Installation Procedure

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/): Code editor.
- [Git](https://git-scm.com/): Version control system.
- [Node.js](https://nodejs.org/en): JavaScript runtime environment.
- [Docker](https://www.docker.com/): Containerization platform.

### Setup

To set up the project locally, follow these steps:

1. **Clone the repository**: Use the `git clone git@github.com:j-caussade/eventura.git` command to clone the project repository. The use of an **SSH key** is mandatory. If you don't have one, follow the [GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to create and add one (use ED25519 type).

2. **Install dependencies**: From the root directory of the project, run `npm install` to install all required dependencies.

3. **Environment variables configuration**: Copy `.env.example` to `.env` at the root of the project and fill in the required values. You need to specify the environment (`dev` or `prod`).  
   **¡Warning!:** Test user credentials are for local development only. Never use them in production.

4. **Launch Docker**: Use the command `sudo docker compose up --build` to download the necessary images start the containers and application. The application and API will be available at `http://localhost:3000`.

## Project Architecture Overview

The project is structured with a focus on modularity and separation of concerns. Here's an overview of the key directories and their functions:

- `./.github/`: Contains the workflow files for the CI/CD pipeline, which automate the testing and deployment processes.

- `./database/`: Contains the scripts to create and populate the project database when launching containers. This includes a `.sh` script that handles the creation of database users (root, application, etc.).

- `./src/`: This directory contains the main logic of the application and is organized into several sub-directories:

  - `./app.js`: The main application file that initializes the Express server and connects different parts of the application.

  - `./config/`:

    - `./dbConfig.js`: MySQL database connection configuration. Centralizes connection parameters for easy environment management and deployment. Uses environment variables to ensure security and flexibility across different environments (development, staging, production).

  - `./controllers/`: Contains the controllers responsible for managing the business logic of the application.

  - `./middlewares/`:

    - `./authMiddleware.js`: Middleware function used to process requests before they reach controllers, including authentication and authorization logic.

  - `./routes/`: Defines the application routes, responsible for directing HTTP requests to appropriate controller functions.

  - `./services/`: Contains service modules that encapsulate business logic and data processing.

  - `./utils/`:
    - `./dataSanitizeUtils.js`: Utility functions for cleaning and securing user input data.
    - `./dbUtils.js`: Utility functions for managing MySQL database connections. Provides a connection pool and helper functions to interact with the database efficiently.
    - `./jwtUtils.js`: Handles the extraction of user IDs from tokens during authentication.

## Docker services

The `docker-compose.yml` file defines the following services :

| Service    | Description                                               | Ports                    |
| ---------- | --------------------------------------------------------- | ------------------------ |
| db         | MySQL 8.0 database (persistent data in mysql_data volume) | 3306                     |
| app        | Node.js application (built from the Dockerfile)           | ${PORT:-3000}            |
| phpmyadmin | phpMyAdmin for database management                        | ${PHPMYADMIN_PORT:-8080} |

- **Networks**: All services communicate via a bridge network (app-network).
- **Volumes**: MySQL data is persisted in the mysql_data volume.

## Contribution Guidelines

### Naming Conventions

**¡Warning!:** These naming conventions are being implemented. They need to be improved and tested.

Adhere to the established naming conventions for the project. These conventions are inspired by the [Conventional Commits naming convention](https://www.conventionalcommits.org/en/v1.0.0/) and also by the [Angular naming convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

#### Types List

- **fix:** A bug fix.
- **feat:** A new feature.
- **update:** A content or database update, an optimization (refactor, style, UI/UX).
- **test:** For testing something.
- **chore:** To group certain changes such as multiple fixes and updates.

#### Commit

`<type>(<optional scope>): <description>`
`<optional body>` (to describe in detail if necessary)
`<optional footer>` (not required)

#### Branch

- **`master`:** Main branch used in production.
- **`dev`:** Development branch.
- **`php-architecture`:** Legacy branch.

## Deploying on VPS

### Prerequisites

- [Apache](https://httpd.apache.org/): Web server.
- [Docker](https://www.docker.com/): Containerization platform.

### Setup

1. **Connection to VPS and code recovery**: Use the command `ssh -i <ssh key path> <vps user>@<vps ipv4>` to connect to the VPS. Set up an **SSH key** and use the `git clone git@github.com:j-caussade/eventura.git` command to clone the project repository in the `./var/www/` directory.
2. **Configuration**: Create a `<project name>.conf` file in the `./etc/apache2/sites-available/` directory and specify the presence of a reverse proxy to point to the localhost and the port chosen for the backend. You can use and configure SSL certificates with [certbot](https://certbot.eff.org/). After configuring the project, you can run the command `sudo a2ensite <project name>.conf` to enable the project and reload the Apache server with `sudo systemctl reload apache2`. Don't forget to register the new DNS with the hosting platform.
3. **Configure and launch Docker**: Go to the project directory `./var/www/<project name>/`, create the `.env` file based on the example, and run the command `sudo docker compose up`.

### Accessing phpMyAdmin

To access the phpMyAdmin interface, follow these steps:

1. **Verify phpMyAdmin container and port**: Use the command `sudo docker ps` to check that the phpMyAdmin container is running and to identify the mapped host port. Look for the `ports` section in the output to find the port number.
2. **Open the port on the VPS firewall**: Ensure that the mapped port is open on your VPS firewall using the command `sudo ufw allow <host_port>`. Also, ensure that the port is open on your cloud provider's firewall settings.
3. **Access phpMyAdmin via browser**: Open a web browser and navigate to `http://<vps_ip>:<host_port>`. Replace `<vps_ip>` with the actual IPv4 address of your VPS and `<host_port>` with the port number identified earlier. You should see the phpMyAdmin login page.
4. **Log in to phpMyAdmin**: Use the MySQL credentials configured in your `.env` file to log in to phpMyAdmin.

## CI/CD Pipeline

### Integration Workflow

The project uses GitHub Actions for Continuous Integration to test changes before merging into the main branch. The integration workflow is triggered by pull requests targeting the `master` branch and ensures that changes are automatically tested.

### Deployment Workflow

The deployment workflow automatically deploys the latest changes from the repository to the VPS. It is triggered by pushes to the `master` branch, ensuring the production environment is kept up-to-date.

## Data schema

**Conceptual data model**  
_High-level view of entities and their relationships without technical details._
![Conceptual Data Model](./docs/schemas/conceptual-data-model.png)

**Logical Data Model**  
_Detailed view of entities, attributes, and relationships, independent of the database technology._
![Logical Data Model](./docs/schemas/logical-data-model.png)

**Physical Data Model**  
_Implementation-specific schema for MySQL, including tables, columns, data types, and constraints._
![Physical Data Model](./docs/schemas/physical-data-model.png)

## Database

The project uses a MySQL for data storage, which is set up and initialized using SQL scripts and shell scripts. Here's how the database is configured and managed:

### SQL Scripts

- **./database/schema.sql**: Creates the database schema (tables, indexes, etc.).

- **./database/data.sql**: Populates the database with test data for immediate application testing.

### Shell Scripts

- **/database/init-db-users.sh**: Bash script that creates a **root** user for database initialization and a dedicated MySQL application **user** (with restricted CRUD permissions).

### Dependencies

The project relies on the following key dependencies for database interactions:

- **MySQL2**: A Node.js driver for MySQL, used for direct database queries and connections. It provides a simple and efficient way to interact with the MySQL database from the Node.js environment.

### Configuration

- **Environment Variables**: The project uses environment variables to manage database configurations. These variables are defined in the `.env` file located at the root of the project directory.

- **Database Connection**:
  - Configuration parameters are centralized in `./config/dbConfig.js`, which uses environment variables for security and flexibility.
  - The connection logic and utility functions are implemented in `./src/utils/dbUtils.js`, which provides a connection pool and helper functions for efficient database interactions.

## Authentication

The authentication system is designed to secure access to certain routes and ensure that only authorized users can perform specific actions. The system utilizes the following key components:

- **Packages**: `bcrypt` for password hashing and `jsonwebtoken` for generating and verifying JSON Web Tokens (JWT).

- **Services**: Authentication services handle the core logic of user registration, login, and token management. These services interact with the database to validate user credentials and manage sessions.

- **Controllers**: Authentication controllers manage incoming requests related to user authentication, such as login and registration. They use services to process these requests and send appropriate responses.

- **Routes**: Specific routes are defined for authentication purposes, including endpoints for user registration and login. These routes are linked to their respective controller functions.

- **Middleware**: Authentication middleware is used to protect certain routes. It checks for valid JWT tokens in incoming requests and ensures that only authenticated and authorized users can access protected endpoints.

## API Documentation

The API is built with Express.js and uses JWT for authentication. Below are the main endpoints:

### Authentication

- **POST** `/api/v1/auth/register`: Register a new user.

  - **Request body**:
    ```json
    {
      "user_first_name": "Jean",
      "user_last_name": "Dupont",
      "user_email": "jean.dupont@example.com",
      "user_password": "UserPassword1234@" // Password must be at least 8 characters long and include at least one uppercase letter, one number, and one symbol.
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully",
      "userId": 3
    }
    ```

- **POST** `/api/v1/auth/login`: Authenticate a user (requires JWT authentication).

  - **Headers**:

    - Authorization: Bearer token

  - **Request body** :
    ```json
    {
      "user_email": "jean.dupont@example.com",
      "user_password": "UserPassword1234@"
    }
    ```
  - **Response**:

    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZSI6MCwiaWF0IjoxNzU1NzExNDM5LCJleHAiOjE3NTU3MTUwMzl9.ZYpSH2bMcT7M5oufV4YF77_vN95g2M2aJWixNzmT8Z8"
    }
    ```

  - **Error response** :
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

### Users

- **GET** `/api/v1/users/account`: User account information.

  - **Headers**:

    - Authorization: Bearer token

  - **Response** :

    ```json
    {
      "user_first_name": "Jean",
      "user_last_name": "Dupont"
    }
    ```

    - **Error response** :

    ```json
    {
      "error": "Invalid token",
      "message": "The provided authentication token is invalid or has expired"
    }
    ```

- **PUT** `/api/v1/auth/change-password`: User reset password.

  - **Request body** :
    ```json
    {
      "currentPassword": "UserPassword1234@",
      "newPassword": "UserNewPassword5678@"
    }
    ```
  - **Response** :

    ```json
    {
      "message": "Password changed successfully"
    }
    ```

    - **Error response** :

    ```json
    {
      "error": "Current password is incorrect"
    }
    ```

### Business logic

- **GET** `/api/v1/events/with-locations-and-organizers`: Retrieve a list of events with their locations and organizers. Authentication is optional but provides additional information.

  - **Headers** (if authenticate):

    - Authorization: Bearer token

  - **Response** :

    ```json
    [
      {
        "event_id": 1,
        "event_name": "Tech Conference 2025",
        "event_start_date": "2025-11-15T09:00:00.000Z",
        "remaining_seats": 499,
        "event_thumbnail": "https://example.com/images/tech-conference-thumbnail.jpg",
        "location_name": "Eiffel Tower",
        "postal_code_number": 75000,
        "city_name": "Paris",
        "organizer_name": "Event Masters",
        "is_user_registered": 0 // Only present if user is authenticated
      }
    ]
    ```

    - **Notes**:

      - If the user is not authenticated, the **is_user_registered** field will not be included in the response.

      - If the user is authenticated, the **is_user_registered** field indicates whether the user is registered for the event (1 for registered, 0 for not registered).

- **GET** `/api/v1/events/with-locations-and-organizers/:id`: Retrieve a specific event with is location and organizer(s). Authentication is optional but provides additional information.

  - **Params**:

    - Path parameters: event_id

  - **Headers** (if authenticate):

    - Authorization: Bearer token

  - **Response** :

    ```json
    {
      "event_id": 2,
      "event_name": "International Food Festival",
      "event_start_date": "2025-12-01T10:00:00.000Z",
      "event_end_date": "2025-12-03T20:00:00.000Z",
      "remaining_seats": 999,
      "event_description": "A celebration of world cuisines with cooking demonstrations, tastings, and cultural events.",
      "event_thumbnail": "https://example.com/images/food-festival-thumbnail.jpg",
      "location_name": "Lyon Convention Center",
      "postal_code_number": 69000,
      "city_name": "Lyon",
      "organizer_name": "Conference Pros",
      "is_user_registered": 0 // Only present if user is authenticated
    }
    ```

    - **Notes**:

      - If the user is not authenticated, the **is_user_registered** field will not be included in the response.

      - If the user is authenticated, the **is_user_registered** field indicates whether the user is registered for the event (1 for registered, 0 for not registered).

## Testing the API with Insomnia
