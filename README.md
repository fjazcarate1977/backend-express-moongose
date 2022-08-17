# Backend with TypeScript

Done in 2021, this is a small example of my work. A backend application to show how powerful Typescript can be not only for frontend projects. The repository includes all the standards that I consider mandatory for a good project Architecture.

## Application

This is a small API rest with Token validation, that allows us, after user validation, to add health information about a one patiente.

## Requirements

- [Node.js](https://nodejs.org/) v16.15.1 or higher

## Installation or Getting Started

    npm i
    npm start
    open http://localhost:6900

The BackEnd must be working.

## Libraries and framework

All the features was added to App from the scratch:

- TypeScript
- Express
- JWT
- Supertest
- MongoDB => nor provided, needs to be added externally 
- Moongose
- Eslint
- Prettier

## Testing

In this case, I'm using Supestest Library:

    npm run test
    npm run test:watch

## Paths:

- user-api/user => POST, create a new user. 
- user-api/get-user-session-validation => POST, get user session validation.
- api/daily => POST, create a new daily.
- api => GET, get all dailies.
- api/{daliy ID} => GET, get daily by ID
- api/{daily ID} => PUT, replace daily by ID
- api/{daili Id} => DELETE, delte daily by ID

