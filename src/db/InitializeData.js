const { connect } = require("./ConnectMongo");

async function initializeData() {
  try {
    const collection = await connect("Users");
    await collection.deleteMany({}); // Clear existing data (optional)
    await collection.insertOne({ username: "admin", email: "Hola" });
    // Add more data as needed
    console.log("Data initialized successfully.");
  } catch (error) {
    console.error("Data initialization failed:", error);
  }
}

module.exports = initializeData;
