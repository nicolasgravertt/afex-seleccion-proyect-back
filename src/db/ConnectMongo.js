const { getClient } = require("./mongoDB");

const connect = async (data) => {
  try {
    const client = await getClient();
    const collection = client.db("Afex").collection(data);
    return collection;
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
};

module.exports = { connect };
