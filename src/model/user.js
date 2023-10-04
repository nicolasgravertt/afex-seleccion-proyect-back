const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const { getClient } = require("../db/mongoDB");

class UserModel {
  static async getAll({}) {
    const client = getClient();
    const collection = client.db("<UserManagement>").collection("<user>");

    return collection.find({}).toArray();
  }

  static async getById({ id }) {
    const client = getClient();
    const collection = client.db("<UserManagement>").collection("<user>");
    const objectId = new ObjectId(id);
    return collection.findOne({ _id: objectId });
  }

  static async create({ input }) {
    const client = getClient();
    const collection = client.db("<UserManagement>").collection("<user>");

    const { insertedId } = await collection.insertOne(input);

    return {
      id: insertedId,
      ...input,
    };
  }

  static async delete({ id }) {
    const client = getClient();
    const collection = client.db("<UserManagement>").collection("<user>");
    const objectId = new ObjectId(id);
    const { deletedCount } = await collection.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  static async update({ id, input }) {
    const client = getClient();
    const collection = client.db("<UserManagement>").collection("<user>");
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

module.exports = { UserModel };
