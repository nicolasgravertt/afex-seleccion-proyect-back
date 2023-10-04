const closeConnection = (req, res, next) => {
  // Check if the MongoDB client is attached to the request object
  if (req.dbClient) {
    // Close the MongoDB connection
    req.dbClient
      .close()
      .then(() => {
        console.log("MongoDB connection closed");
      })
      .catch((err) => {
        console.error("Error closing MongoDB connection:", err);
      });
  }
};

module.exports = closeConnection;
