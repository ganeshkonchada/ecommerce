const express = require("express");
const app = express();
const { Connect } = require("./utils/db");
require("dotenv/config");
const bodyParser = require("body-parser");

const {authenticationCheck} = require("./utils/auth/jwtservice");
const routes = require("./api/routes/index");

app.use(bodyParser.json());

// Ping test API
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

// Token authentication cheking for cart APIs
app.use('/cart', authenticationCheck );

// Routes
routes(app);

// Database connection
Connect();

// Server 
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log({ err });
    process.exit(1);
  }
  console.log(`APP is now running on port ${process.env.PORT}`);
});

module.exports = app;
