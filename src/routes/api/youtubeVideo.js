const express = require("express");
const router = express.Router();
const YoutubeVideoController = require("../../controllers/youtubeVideos/youtubeVideo");

const createYoutubeVideoRouter = ({ YoutubeVideoModel }) => {
  const youtubeVideoController = new YoutubeVideoController({
    YoutubeVideoModel,
  });
  router
    .route("/")
    .get(youtubeVideoController.getAll)
    .post(youtubeVideoController.create);

  router
    .route("/:id")
    .get(youtubeVideoController.getById)
    .delete(youtubeVideoController.delete)
    .patch(youtubeVideoController.update);

  return router;
};

module.exports = { createYoutubeVideoRouter };
