const {
  validatePartialYoutubeVideo,
  validateYoutubeVideo,
} = require("../../schemas/youtubeVideo");

class YoutubeVideoController {
  constructor({ YoutubeVideoModel }) {
    this.YoutubeVideoModel = YoutubeVideoModel;
  }

  getAll = async (req, res) => {
    const youtubeVideo = await this.YoutubeVideoModel.getAll();
    res.json(youtubeVideo);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const youtubeVideo = await this.YoutubeVideoModel.getById({ id });
    if (youtubeVideo) return res.json(youtubeVideo);
    res.status(404).json({ message: "Youtube Video not found" });
  };

  create = async (req, res) => {
    const result = validateYoutubeVideo(req.body);

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newYoutubeVideo = await this.YoutubeVideoModel.create({
      input: result.data,
    });

    res.status(201).json(newYoutubeVideo);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.YoutubeVideoModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Youtube Video not found" });
    }

    return res.json({ message: "Youtube Video deleted" });
  };

  update = async (req, res) => {
    const result = validatePartialYoutubeVideo(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedYoutubeVideo = await this.YoutubeVideoModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedYoutubeVideo);
  };
}

module.exports = YoutubeVideoController;
