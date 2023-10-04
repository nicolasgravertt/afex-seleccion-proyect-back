const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/userController");

const createUserRouter = ({ userModel }) => {
  const userController = new UserController({ userModel });
  router
    .route("/")
    .get(userController.getAll)
    .post(userController.create)
    .put(userController.update)
    .delete(userController.delete);

  router.route("/:id").get(userController.getById);

  return router;
};

module.exports = { createUserRouter };
