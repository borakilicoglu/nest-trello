# nest-trello

![image](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F3840%2F1*LsHTe083IpvKL5anH7b_NA.png&f=1&nofb=1)

## Installation

Clone the repository

- `git clone https://github.com/borakilicoglu/nest-trello.git`

Switch to the repo folder

- `cd nest-trello`

Install dependencies

- `npm install` or `yarn` if using Yarn

Copy sample .env file and set JWT secret key

- `npm run init:env` or `yarn init:env` will copy `.env.example` to `.env`
- Manually set the SECRET variable, as well as the database config

---

## Database

The example codebase uses [Typeorm](http://typeorm.io/) with a PostgreSQL database.

Create a new PostgreSQL database with the name `nest-trello` (or the name you specified in the .env)

On application start, tables for all entities will be created.

---

## NPM scripts

- `npm start` / `yarn start` - Start application
- `npm run start:dev` / `yarn start:dev` - Start application in watch mode
- `npm run test` / `yarn test` - run Jest test runner
- `npm run start:prod` / `yarn start:prod` - Build application in production mode

---

## Start application

- `npm start` / `yarn start`
- Test api with `http://localhost:3000/api/boards` in your favourite browser

---

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.
