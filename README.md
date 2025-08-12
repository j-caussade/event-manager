# Eventura

**¡Warning!:** This file is being prepared and will be updated gradually and regularly. These instructions are intended for a user of Ubuntu.

## Description

Event management project containerized with Docker and developed in Node.js and Express for the backend, with a MySQL relational database accessible with phpMyAdmin.

## Table of Contents

- [Local installation procedure](#local-installation-procedure)
- [Project architecture overview](#project-architecture-overview)
- [Contribution guidelines](#contribution-guidelines)
- [Deploying on VPS](#deploying-on-vps)
- [CI/CD Pipeline](#ci-cd-pipeline)
- [Database](#database)
- [Authentication](#authentication)

## Local Installation Procedure

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/): Code editor.
- [Git](https://git-scm.com/): Version control system.
- [Node.js](https://nodejs.org/en): JavaScript runtime environment.
- [Docker](https://www.docker.com/): Containerization platform.

### Setup

To set up the project locally, follow these steps:

1. **Clone the repository**: Use the `git clone git@github.com:j-caussade/eventura.git` command to clone the project repository. The use of an **SSH key** is mandatory. If you don't have one, follow the [GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to create and add one (use ED25519 type).
2. **Initialize server**: Navigate to the server directory and install dependencies with `npm install`. Create a `.env` file based on the example to be able to run the backend.
3. **Prepare and launch Docker**: Navigate to the main directory of the project and create a `.env` file based on the example. You need to specify the environment (`dev` or `prod`). Use the command in the main directory `sudo docker compose up --build` to download images and start containers.

## Project Architecture Overview

The project is structured with a focus on modularity and separation of concerns. Here's an overview of the key directories and their functions:

- `./.github/`: Contains the workflow files for the CI/CD pipeline, which automate the testing and deployment processes.

- `./database/`: Contains the scripts to create and populate the project database when launching containers.

- `./src/`: This directory contains the main logic of the application and is organized into several sub-directories:
  - `app.js`: The main application file that initializes the Express server and connects different parts of the application.
  - `controllers/`: Contains the controllers responsible for managing the business logic of the application.
  - `middlewares/`: Includes middleware functions, such as `authMiddleware.js`, used to process requests before they reach controllers.
  - `routes/`: Defines the application routes, responsible for directing HTTP requests to appropriate controller functions.
  - `services/`: Contains service modules that encapsulate business logic and data processing.
  - `utils/`: Utility functions and helpers, including `db.js` for managing database connections.

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

## Database

The project uses a MySQL database, which is set up and initialized using SQL scripts. Here's how the database is configured and managed:

### SQL Scripts

- **Schema Script**: Located at `./database/schema.sql`, this script is responsible for creating the database schema, including tables and initial setup. It should be used to set up the database structure.

- **Data Script**: Located at `./database/data.sql`, this script is used to populate the database with initial data. It is executed after the schema script to ensure all tables are properly set up before data insertion.

### Dependencies

The project relies on the following key dependencies for database interactions:

- **MySQL2**: A Node.js driver for MySQL, used for direct database queries and connections. It provides a simple and efficient way to interact with the MySQL database from the Node.js environment.

### Configuration

- **Environment Variables**: The project uses environment variables to manage database configurations. These variables are defined in the `.env` file located at the root of the project directory.

- **Database Connection**: The database connection is managed using MySQL2, a Node.js driver for MySQL. The connection setup can be found in the file `./src/utils/db.js`. This file contains the configuration and logic for connecting to the MySQL database.

## Authentication

The authentication system is designed to secure access to certain routes and ensure that only authorized users can perform specific actions. The system utilizes the following key components:

- **Packages**: `bcrypt` for password hashing and `jsonwebtoken` for generating and verifying JSON Web Tokens (JWT).

- **Services**: Authentication services handle the core logic of user registration, login, and token management. These services interact with the database to validate user credentials and manage sessions.

- **Controllers**: Authentication controllers manage incoming requests related to user authentication, such as login and registration. They use services to process these requests and send appropriate responses.

- **Routes**: Specific routes are defined for authentication purposes, including endpoints for user registration and login. These routes are linked to their respective controller functions.

- **Middleware**: Authentication middleware is used to protect certain routes. It checks for valid JWT tokens in incoming requests and ensures that only authenticated and authorized users can access protected endpoints.
