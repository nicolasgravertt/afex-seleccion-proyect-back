const { ObjectId } = require("mongodb");
const { getClient } = require("../db/mongoDB");

async function connect() {
  try {
    const client = await getClient();
    const collection = client.db("Afex").collection("YoutubeVideo");
    return collection;
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

class YoutubeVideoModel {
  static async getAll() {
    const collection = await connect();

    return collection.find({}).toArray();
  }

  static async getById({ id }) {
    const collection = await connect();
    const objectId = new ObjectId(id);
    return collection.findOne({ _id: objectId });
  }

  static async create({ input }) {
    const collection = await connect();

    const { insertedId } = await collection.insertOne(input);

    return {
      id: insertedId,
      ...input,
    };
  }

  static async delete({ id }) {
    const collection = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await collection.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  static async update({ id, input }) {
    const collection = await connect();
    const objectId = new ObjectId(id);

    const { ok, value } = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnNewDocument: true }
    );

    if (!ok) return false;

    return value;
  }
}

module.exports = YoutubeVideoModel;
