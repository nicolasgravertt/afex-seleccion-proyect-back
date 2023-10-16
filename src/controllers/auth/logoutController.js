const { connect } = require("../../db/ConnectMongo");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).json({ message: "No content" }); //No content

  const refreshToken = cookies.jwt;
  const collection = await connect("Users");

  // Is refreshToken in db?
  const [foundUser] = await collection
    .find({ refreshToken: refreshToken })
    .toArray();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  collection.findOneAndUpdate(
    { username: foundUser.refreshToken },
    { $set: { refreshToken: "" } },
    { returnNewDocument: true }
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(200).json({ message: "Sesion Finalizada" });
};

module.exports = { handleLogout };
