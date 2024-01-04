# Messenger-React-Fastify Monorepo

## About the Project
messenger-react-fastify is a modern messaging platform built on the robust Fastify framework, following the principles of Clean Architecture as outlined by Uncle Bob here. This project is structured to ensure high maintainability, scalability, and the effective separation of concerns.

## Project Structure

The project is divided into two main apps:

1. `server`: This is the backend of the application, built with Fastify. The code for this app is located in [apps/server](apps/server).

2. `web`: This is the frontend of the application, built with React. The code for this app is located in [apps/web](apps/web).

## Getting Started

To get started with the project, you need to install the dependencies first. Run the following command in the root directory:

```sh
pnpm install
```

Then, you can start the server and the web app with the following commands:
```sh
pnpm run server dev
pnpm run web dev
```

## Contributing
This is a practice project, and contributions are welcome. Please feel free to submit issues and pull requests.

## License
This project is licensed under the ISC License.