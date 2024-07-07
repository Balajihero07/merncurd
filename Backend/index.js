const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userDataRoute = require("./routes/userDataRoute");

dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Fetch MongoDB URI from environment variable
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true // Ensure this is set if required by your MongoDB Atlas setup
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Attach user data routes
app.use('/api/users', userDataRoute);

// Start the server
const port = process.env.APIURI || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
