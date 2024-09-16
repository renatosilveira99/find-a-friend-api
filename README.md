# Find a Friend API

Find a Friend is an API designed to facilitate animal adoption. It allows users to manage pets, view available pets for adoption, and interact with organizations. The API provides endpoints for registering pets, listing available pets, filtering pets by characteristics, viewing pet details, and managing organizations.

## Features

- **Register Pets**: Add new pets to the database.
- **List Pets for Adoption**: Retrieve all pets available for adoption in a specified city.
- **Filter Pets**: Filter pets by various characteristics.
- **View Pet Details**: Get detailed information about a specific pet.
- **Register Organizations**: Register organizations that can manage pets and adoption processes.
- **Organization Login**: Log in as an organization to manage pets and view details.

## Design

For a detailed view of the application design, check out the Figma file: [Find A Friend (APP)](https://www.figma.com/community/file/1220006040435238030/Find-A-Friend-(APP))

## Application Rules

- [x] It must be possible to register a pet.
- [x] It should be possible to list all pets available for adoption in a city.
- [x] It should be possible to filter pets by their characteristics.
- [x] It must be possible to view the details of a pet for adoption.
- [x] It must be possible to register as an organization.
- [x] Must be able to login as an organization.

## Business Logic

- [x] To list the pets, the city must be specified.
- [x] An organization needs to have an address and a WhatsApp number.
- [x] A pet must be linked to an organization.
- [x] Users looking to adopt will contact the organization via WhatsApp.
- [x] All filters other than city are optional.
- [x] To access the application as an admin, an organization needs to be logged in.

## Installation

To set up the Find a Friend API locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/renatosilveira99/find-a-friend-api
   cd find-a-friend-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Start the development server:**
   ```bash
   npm run start:dev
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## Development

- **Linting:** To lint the code, use:
  ```bash
  npm run lint
  ```

- **Testing:** To run unit tests, use:
  ```bash
  npm test
  ```

- **End-to-End Testing:** To run E2E tests, use:
  ```bash
  npm run test:e2e
  ```

- **Coverage Report:** To generate a test coverage report, use:
  ```bash
  npm run test:coverage
  ```
