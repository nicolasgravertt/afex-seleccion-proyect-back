const axios = require("axios");
const { youtubeApiConf } = require("../axios/axios");

const transformISO8601 = (time) => {
  const iso8601Duration = time; // Example ISO 8601 duration string
  const hourRegex = /PT(\d+)H(\d+)M(\d+)S/;
  const hourMatch = iso8601Duration.match(hourRegex);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1], 10);
    const minutes = parseInt(hourMatch[2], 10);
    const seconds = parseInt(hourMatch[3], 10);
    return `${hours}:${minutes}:${seconds}`;
  }
  const minuteRegex = /PT(\d+)M(\d+)S/;
  const minuteMatch = iso8601Duration.match(minuteRegex);
  if (minuteMatch) {
    const minutes = parseInt(minuteMatch[1], 10);
    const seconds = parseInt(minuteMatch[2], 10);
    return `${minutes}:${seconds}`;
  }
};

const get = async (youtubeId) => {
  try {
    const config = youtubeApiConf(youtubeId);
    const { data } = await axios.request(config);

    if (data.items.length === 0) return null;

    const { items } = data;
    const { id, snippet, contentDetails } = items[0];
    const { title, description, thumbnails } = snippet;
    const videoDuration = transformISO8601(contentDetails.duration);
    const input = {
      title: title,
      description: description,
      thumbnail: thumbnails.medium.url,
      videoUrl: `https://www.youtube.com/watch?v=${id}`,
      videoDuration,
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
