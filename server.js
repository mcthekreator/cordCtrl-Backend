const express = require("express");
app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const router = require('./routes/users.route')

app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT;

const start = () => {
  try {
    connectDB(process.env.DB_URL);
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
  } catch (error) {
    console.log("unable to connect to database");
  }
};

start();
