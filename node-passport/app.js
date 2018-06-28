const express = require("express"),
      path = require("path"),
      bodyParser = require("body-parser"),
      session = require("express-session"), // Creates a session middleware with the given options (Express).
      cors = require("cors"), // Enable CORS in various options (Express).
      mongoose = require("mongoose"), // Elegant mongodb object modeling for Node.js (ODM).
      errorHandler = require("errorhandler"), // Development-only error handler middleware (Express).
      morgan = require("morgan"); /* Morgan is another HTTP request logger middleware for Node.js.
                                              It simplifies the process of logging requests to your application.
                                              You might think of Morgan as a helper that collects logs from your server,
                                              such as your request logs. */

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

// Initialize the application
const app = express();

// Configure the application
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "node-passport",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

// Configure Mongoose
mongoose.connect("mongodb://localhost/node-passport");
mongoose.set("debug", true);

// Models & routes
require("./models/User");
require('./config/passport');
app.use(require('./routes'));

// Error handlers & middlewares
if (!isProduction) {
  app.use(errorHandler());
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: isProduction ? err : {}
    }
  });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000/"));
