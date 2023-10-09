const { MongoClient } = require("mongodb");
require("dotenv").config();

const openConnection = async (req, res, next) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Attach the MongoDB client to the request object
    req.dbClient = client;

    // Continue processing the request
    console.log(`connected to MongoDB`);
    next();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = openConnection;
