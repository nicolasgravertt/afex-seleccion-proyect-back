const { MongoClient } = require("mongodb");

const openConnection = async (req, res, next) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
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
