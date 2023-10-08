require("dotenv").config();
const url = require("url");

const youtubeApiConf = (videoId) => {
  const urlString = "https://www.googleapis.com/youtube/v3/videos";
  const parsedUrl = url.parse(urlString, true);

  parsedUrl.query.id = videoId;
  parsedUrl.query.key = process.env.YOUTUBE_API_KEY;
  parsedUrl.query.part = "snippet,contentDetails";

  const modifiedUrlString = url.format({
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    pathname: parsedUrl.pathname,
    query: parsedUrl.query,
    hash: parsedUrl.hash,
  });

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: modifiedUrlString,
    headers: {},
  };

  return config;
};

module.exports = { youtubeApiConf };
