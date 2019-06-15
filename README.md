# nest-trello

---

# Getting started

## Installation

Clone the repository

    git clone https://github.com/borakilicoglu/nest-trello.git

Switch to the repo folder

    cd nest-trello

Install dependencies

    npm install

Copy config file and set JWT secret key

    cp src/.env.example src/.env

---

## Database

The example codebase uses [Typeorm](http://typeorm.io/) with a PostgreSQL database.

Create a new PostgreSQL database with the name `nest-trello` (or the name you specified in the .env)

On application start, tables for all entities will be created.

---

## NPM scripts

- `npm start` - Start application
- `npm run start:watch` - Start application in watch mode
- `npm run test` - run Jest test runner
- `npm run start:prod` - Build application

---

## Start application

- `npm start`
- Test api with `http://localhost:3000/api/boards` in your favourite browser

---

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.
