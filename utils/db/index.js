const mongoose = require("mongoose");
require("dotenv/config");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URI, MONGO_DB_NAME } = process.env;

let databaseURI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_URI}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
const connection = mongoose.connect(databaseURI);

connection
  .then((db) => {
    console.log(
      `Successfully connected to ${MONGO_URI} MongoDB cluster.`
    );
    return db;
  })
  .catch((err) => {
    if (err.message.code === "ETIMEDOUT") {
      console.log("Attempting to re-establish database connection.");
      mongoose.connect(databaseURI);
    } else {
      console.log("Error while attempting to connect to database:", err );
    }
  });

// module.exports = connection;
exports.Connect = () => {
  return connection;
};
