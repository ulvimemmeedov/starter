# Getting started

## config

copy .env.example and rename .env (DO NOT DELETE OR RENAME .env.example JUST COPY AND RENAME)

## Run

### Prod

show container

```sh
$ sudo docker ps
```

run

```sh
$ sudo docker-compose up --build -d --remove-orphans
```

or

```sh
$ docker restart <container_id>
```

### Localy

```sh
$ npm install
```

```sh
$ npm start
```

or dev server

```sh
$ npm run dev
```

To get the Node server running locally:

-   Clone this repo
-   `npm install` to install all required dependencies
-   Create MongoDb Cluster and Get Connection MongoDb URI
-   Set environment variables in `.env` under `./src`
    -   Set `MONGO_URI = <YOUR_MONGO_URI>`
    -   Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
-   `npm run dev` to start the local server

# Code Overview

## Dependencies

-   [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
-   [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JavaScript
-   [bcryptjs](https://github.com/dodo/node-slug) - Hashing Password
-   [dotenv](https://github.com/motdotla/dotenv) - Zero-Dependency module that loads environment variables

## Application Structure

-   `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
-   `routes/` - This folder contains the route definitions (answer, question etc. ) for our API.
-   `collections/` - This folder contains the schema definitions for our Mongoose collections (User).
-   `controllers/` - This folder contains controllers for our API.
-   `public/` - This folder contains static files for our API.
-   `middlewares/` - This folder contains middlewares for our API.
-   `helpers/` - This folder contains helper functions for adapting 3rd party libraries for our API.
-   `services/` - This folder contains services.
-   `helpers/` - This folder contains helper functions.
-   `views/` - This folder contains ejs files.

## Error Handling

In `helpers/errors/errorHandler.js`, we define a error-handling middleware for handling Mongoose's errors and our own errors.

## Authentication

Requests are authenticated using the `access_token` cookies and value `Bearer: {{token}}`. with a valid JWT.

We define express middlewares in `middlewares/auth/auth.js` that can be used to authenticate requests. The `required` middlewares returns `401` or `403`.

## API Specifications

soon
