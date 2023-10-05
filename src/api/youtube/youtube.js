const axios = require("axios");
const { youtubeApiConf } = require("../axios/axios");

const get = async (videoId) => {
  try {
    const config = youtubeApiConf(videoId);
    const { data } = await axios.request(config);
    const { items } = data;
    const { id, snippet } = items[0];
    const { title, description, thumbnails } = snippet;

    const input = {
      title: title,
      description: description,
      thumbnail: thumbnails.medium.url,
      videoUrl: `https://www.youtube.com/watch?v=${id}`,
    };

    return input;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  get,
};
