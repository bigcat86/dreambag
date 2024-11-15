const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/connection");
const { authMiddleware } = require("./middleware/authMiddleware");
//const session = require('express-session');
const routes = require('./controllers'); // Import API routes
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const app = express();
//const server = 

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(authMiddleware);
app.use(bodyParser.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {

    console.log('MongoDB database connection established successfully')
    
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });

  });

db.on("error", (error) => {
  console.error('MongoDB connection error:', error);
});

