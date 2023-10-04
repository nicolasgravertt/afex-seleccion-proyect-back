const allowedUrls = require("./AllowedUrls");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedUrls.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
