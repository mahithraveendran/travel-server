import { z } from "zod";

// create user validation schema
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required",
    }),
    email: z
      .string({
        required_error: "Email must be a valid email address",
      })
      .email(),
    password: z.string().min(8).max(255),
    profile: z
      .object(
        {
          bio: z.string().max(255),
          age: z.number().int().positive(),
        },
        {
          required_error: "Profile field is required",
        }
      )
      .optional(),
  }),
});

// login user validation schema
const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
  }),
});

// update user profile validation schema
const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserProfileValidationSchema,
};
