const express = require("express");

app = express();
require("dotenv").config();

const connectDB = require("./db/connect");
const router = require("./routes/users.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api", router);

const start = () => {
  try {
    connectDB(process.env.DB_URL);
    console.log("Connected to database");
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log("unable to connect to database");
  }
};

start();
