const Config = require('./config/config');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const morgan = require('morgan');
const PORT = Config.get('/app/port');
const MONGODB_URI = Config.get('/mongo/uri');
mongoose.Promise = Promise;
//Parse application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Server instance
const server = http.createServer(app);
// Add Logging
app.use(morgan('combined'));


// -------------------------- Sessions -----------------------------
//Initiate sessions
app.use(
  session({
    secret: "Secret",
    store: new MongoStore({ uri: MONGODB_URI, collection: "sessions" }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 12*60*60*1000 // In milliseconds
      // maxAge: 5*1000 // In milliseconds
    },
    rolling: true
  })
);
//Initialize passport
// app.use(passport.initialize());
// app.use(passport.session()); // will call the deserializeUser

// -------------------------- Routes -----------------------------
//Serves routes from inside app
app.use(express.static(path.join(__dirname, "/build")));
app.use(routes);

// //Serves routes from outside app
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// -------------------------- MongoDB -----------------------------
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log("Unable to connect to the mongoDB server. Error:", err);
  } else {
    console.log("Connection established to", MONGODB_URI);
  }
});

const db = mongoose.connection;
// Show any mongoose errors
db.on("error", error => {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});


// Start the API server
app.listen(PORT, () => console.log("App listening on PORT " + PORT) );
