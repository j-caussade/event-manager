# Eventura

**¡Warning!:** This file is being prepared and will be updated gradually and regularly. These instructions are intended for a user of Ubuntu.

## Description

Event management project containerized with Docker and developed in Node.js and Express for the backend, with a MySQL relational database accessible with phpMyAdmin.

## Table of Contents

- [Local installation procedure](#local-installation-procedure)
- [Project architecture overview](#project-architecture-overview)
- [Contribution guidelines](#contribution-guidelines)
- [Deploying on VPS](#deploying-on-vps)

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

The project is structured as follows:

- `database/`: Contains the script to create the database for the project.
- `server/`: Contains the backend part of the project.

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

### Update

To ensure that the deployment on the VPS is updated automatically with the latest changes from the repository, a Continuous Integration/Continuous Deployment (CI/CD) pipeline has been set up using GitHub Actions.

#### CI/CD Pipeline Overview

The pipeline performs the following steps:

1. **Checkout Code**: The latest code is checked out from the repository.
2. **Deploy to VPS**: The code is copied to the VPS using SCP (Secure Copy Protocol).
3. **Configure and Launch Docker**: On the VPS, Docker Compose is used to pull the latest images, rebuild the containers if necessary, and restart the containers to apply the latest changes.

This pipeline ensures that any changes pushed to the `master` branch are automatically deployed to the VPS, keeping the production environment up-to-date with the latest code.
