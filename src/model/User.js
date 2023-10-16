const { ObjectId } = require("mongodb");
const { connect } = require("../db/ConnectMongo");

class UserModel {
  static async getAll({}) {
    const collection = await connect("Users");

    return collection.find({}).toArray();
  }

  static async getById({ id }) {
    const collection = await connect("Users");
    const objectId = new ObjectId(id);
    return collection.findOne({ _id: objectId });
  }

  static async create({ input }) {
    const collection = await connect("Users");

    const { insertedId } = await collection.insertOne(input);

    return {
      id: insertedId,
      ...input,
    };
  }

  static async delete({ id }) {
    const collection = await connect("Users");
    const objectId = new ObjectId(id);
    const { deletedCount } = await collection.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  static async update({ id, input }) {
    const collection = await connect("Users");
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
