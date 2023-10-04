const z = require("zod");

const movieSchema = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required.",
  }),
  password: z.string({ required_error: "Username is required." }),
  email: z
    .string({
      required_error: "Username must be a string",
    })
    .email(),
  roles: z.array(z.enum(["user", "admin"]), {
    required_error: "User rol is required.",
    invalid_type_error: "User rol must be an array of enum rol",
  }),
});

function validateUser(input) {
  return movieSchema.safeParse(input);
}

function validatePartialUser(input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = { validatePartialUser, validateUser };
