# Event manager

**¡Warning!:** This file is being prepared and will be updated gradually and regularly.

### Description

Project of event management.

## Table of Contents

- [Local Installation Procedure](#local-installation-procedure)
- [Project Architecture Overview](#project-architecture-overview)
- [Contribution Guidelines](#contribution-guidelines)

## Local Installation Procedure

### Prerequisites

- [IDE Visual Studio Code](https://code.visualstudio.com/): Code editor.

### Set up

To set up the project locally, follow these steps.

1. **Clone the repository**: Use the `git clone git@github.com:j-caussade/event-manager.git` command to clone the project repository. The use of an **SSH key** is mandatory. If you don't have one, follow the [GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to create and add one (use ED25519 type).

## Project Architecture Overview

The project is structured as follows:

- `database/`: Contains the script to create the database of the project.

## Contribution Guidelines

### Naming Conventions

**¡Warning!**: These naming conventions are being implemented. They need to be improved and tested.

Adhere to the established naming conventions for the project.  
This conventions are inspired by [Commits Conventionnels naming convention](https://www.conventionalcommits.org/en/v1.0.0/) also inspired by [Angular naming convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

##### Types list

- **fix:** A bug fix.
- **feat**: A new feature.
- **update**: A content or database updating, an optimization (refactor, style, ui/ux).
- **test**: For testing something.
- **chore**: To group certain changes such as multiple fix and update.

#### Commit

`<type>(<optional scope>): <description>`  
`<optional body>` (to describe in detail if necessary)  
`<optional footer>` (not required)

#### Branch

- **`master`:** Main branch.
