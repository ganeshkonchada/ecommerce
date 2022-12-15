# Ecommerce Backend
The Ecommerce backend repository which contian all services in single project. 

## Prerequisites
1. Node version required: `^16.0.0`

## Features
- Uses [npm](https://npmjs.com)
- No transpilers, just vanilla javascript with ES2018 latest features like Async/Await
- Express + MongoDB ([Mongoose](http://mongoosejs.com/))
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)


## Dependencies
* node
* express
* bcrypt
* body-parser
* mongoose
* jsonwebtoken

## Getting Started
1. Clone this repository.
2. Run `npm install`
4. Add `.env` file.
5. To start use `node server.js`

Update the .env details locally
<h2>.env</h2>

PORT=""
MONGO_USERNAME=""
MONGO_PASSWORD=""
MONGO_URI=""
MONGO_DB_NAME=""
ACCESS_TOKEN_SECRET=""

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `api/routes/` - This folder contains the route definitions for our API.
- `api/models/` - This folder contains the schema definitions for our Mongoose models.
- `api/controllers/` - This folder contains the controllers which are linked by API.
- `api/middlewares/` - This folder contains the middlewares which are used for validation for APIs.
- `api/services/` - This folder contains the services whcih are common methods across this applcaition.

## Database
we can use any persistant DB for this service. We are using MongoDB.

## API Guidelines
API Collection: [Postman collection](https://api.postman.com/collections/9426886-1722f2f4-3038-4faa-861e-452bbcb57792?access_key=PMAT-01GMA6NWGW0V1BRFQGSX2AWVR4)

## Authentication
* We are using JWT token authentication.

Auth-Example:
   "Authorization": "Bearer {token}"