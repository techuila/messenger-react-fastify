# messenger-react-fastify (Server)

## Overview of the Server
The server component of messenger-react-fastify is meticulously designed following the principles of [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as introduced by Robert C. Martin, commonly known as **Uncle Bob**. This architectural style emphasizes the **separation of concerns**, making the system more **maintainable**, **flexible**, and **scalable**.

![clean architecture](./assets/CleanArchitecture.jpg)

## Key Features of Clean Architecture
- **Independent of Frameworks**: The architecture does not rely heavily on the Fastify framework, ensuring that the business rules are not bound to the framework. This makes it easier to switch frameworks if needed.
- **Testable**: The business rules can be tested without the UI, database, web server, or any external element.
- **Independent of UI**: The UI can change easily, without changing the rest of the system. A web UI could be replaced with a console UI, for example, without changing the business rules.
- **Independent of Database**: You can swap out Oracle or SQL Server, for a flat file system without changing the business logic.
- **Independent of any external agency**: In fact, your business rules simply don’t know anything at all about the outside world.

## Implementation
- **Core Layer**: Contains the Entities (business objects of the application) and Use Cases (application specific business rules). This layer is the heart of the business logic.
  - **Entities**: Represent the business objects and are contained within the entities folder.
  - **Services**: The services folder implements the application's specific business rules. They encapsulate and implement all of the use cases of the system.
- **Infrastructure Layer**: Includes frameworks and tools such as databases and web servers, specific to our environment. This layer contains:
  - **Database Configurations:** Located under infrastructure/database, handling the database connectivity and configurations.
  - **HTTP Layer**: Houses the Fastify framework-related code, defining controllers, plugins, routes, and schemas which are instrumental in handling HTTP requests and responses.
    - **Controllers**: Responsible for receiving the input from the user, handling user input and sending it to the use cases or services.

By adhering to Clean Architecture, our project ensures that the server is not just robust and efficient but also adaptable to changes in technology and business requirements, making it a future-proof solution for scalable web applications.

## Project Structure
```css
server
├── src
│   ├── core
│   │   ├── entities
│   │   ├── repositories
│   │   └── services
│   ├── infrastructure
│   │   ├── database
│   │   │   └── index.ts
│   │   ├── http
│   │   │   ├── controllers
│   │   │   ├── plugins
│   │   │   ├── routes
│   │   │   ├── schemas
│   │   │   └── server
│   │   │       └── index.ts
│   └── app.ts
└── tests
    └── test.spec.ts
```
- **Core**: Contains business logic with Entities, Repositories, and Services.
- **Infrastructure**: Controllers, Gateways, Presenters, and the Fastify framework-related configurations.
- **Tests**: Dedicated directory for test cases.

## Available Scripts

In the project directory, you can run:

### `pnpm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm start`

For production mode

### `pnpm run test`

Run the test cases.