const z = require("zod");

const youtubeVideoSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required.",
  }),
  description: z.string({ required_error: "Description is required." }),
  thumbnail: z
    .string({
      invalid_type_error: "Thumbnail must be a string",
      required_error: "Thumbnail is required",
    })
    .url({
      message: "Not a valid URL",
    }),
  videoUrl: z
    .string({
      invalid_type_error: "Video URL must be a string",
      required_error: "Video URL is required.",
    })
    .url({
      message: "Not a valid URL",
    }),
  videoDuration: z.string({
    invalid_type_error: "Video duration must be a string",
    required_error: "Video duration is required.",
  }),
});

function validateYoutubeVideo(input) {
  return youtubeVideoSchema.safeParse(input);
}

function validatePartialYoutubeVideo(input) {
  return youtubeVideoSchema.partial().safeParse(input);
}

module.exports = { validatePartialYoutubeVideo, validateYoutubeVideo };
