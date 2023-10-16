const bcrypt = require("bcrypt");
const { connect } = require("../../db/ConnectMongo");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const collection = await connect("Users");
  // check for duplicate usernames in the db
  const [duplicate] = await collection.find({ username: user }).toArray();

  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    collection.insertOne(newUser);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
