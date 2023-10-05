const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const { logger } = require("./src/middleware/logEvents");
const errorHandler = require("./src/middleware/errorHandler");
// const verifyJWT = require("./src/middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./src/middleware/credentials");
const openConnection = require("./src/middleware/openConnection");
// const closeConnection = require("./src/middleware/closeConnection");
const PORT = process.env.PORT || 3500;

// import routes
const { createYoutubeVideoRouter } = require("./src/routes/api/youtubeVideo");

const createApp = ({ YoutubeVideoModel }) => {
  // custom middleware logger
  app.use(logger);

  // Handle options credentials check - before CORS!
  // and fetch cookies credentials requirement
  app.use(credentials);

  // Cross Origin Resource Sharing
  app.use(cors(corsOptions));

  // built-in middleware to handle urlencoded form data
  app.use(express.urlencoded({ extended: false }));

  // built-in middleware for json
  app.use(express.json());

  //middleware for cookies
  app.use(cookieParser());

  // Connect to database
  app.use(openConnection);

  // auth routes
  // app.use("/", require("./src/routes/root"));
  // app.use("/register", require("./src/routes/register"));
  // app.use("/auth", require("./src/routes/auth"));
  // app.use("/refresh", require("./src/routes/refresh"));
  // app.use("/logout", require("./src/routes/logout"));

  // app.use(verifyJWT);

  // general routes
  app.use(
    "/youtube",
    createYoutubeVideoRouter({ YoutubeVideoModel: YoutubeVideoModel })
  );
  // Close Connection
  // app.use(closeConnection);

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

module.exports = { createApp };
