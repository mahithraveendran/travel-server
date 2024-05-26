import { UserRole, UserStatus } from "@prisma/client";
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
    userName: z.string().min(3).max(255).optional(),
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

// change user password validation schema
const changeUserPasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(8).max(255),
    newPassword: z.string().min(8).max(255),
  }),
});

// user status update validation schema
const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.nativeEnum(UserStatus),
  }),
});

// user role update validation schema
const changeUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.nativeEnum(UserRole),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  loginUserValidationSchema,
  updateUserProfileValidationSchema,
  changeUserPasswordValidationSchema,
  updateUserStatusValidationSchema,
  changeUserRoleValidationSchema,
};
