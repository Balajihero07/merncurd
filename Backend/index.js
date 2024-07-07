const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
app.use(cors());

const userDataRoute = require("./routes/userDataRoute");

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB database (locally)
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  });
  

// Attach routes
app.use(userDataRoute);
