const axios = require("axios");
const moment = require("moment");
const { youtubeApiConf } = require("../axios/axios");

const transformISO8601 = (time) => {
  const duration = moment.duration(time);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let formattedString;
  if (hours === 0) {
    formattedString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    formattedString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return formattedString;
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
