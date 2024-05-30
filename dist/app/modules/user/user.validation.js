"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// create user validation schema
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name field is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email must be a valid email address",
        })
            .email(),
        password: zod_1.z.string().min(8).max(255),
        userName: zod_1.z.string().min(3).max(255).optional(),
        profile: zod_1.z
            .object({
            bio: zod_1.z.string().max(255),
            age: zod_1.z.number().int().positive(),
        }, {
            required_error: "Profile field is required",
        })
            .optional(),
    }),
});
// login user validation schema
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8).max(255),
    }),
});
// update user profile validation schema
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255).optional(),
        email: zod_1.z.string().email().optional(),
    }),
});
// change user password validation schema
const changeUserPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string().min(8).max(255),
        newPassword: zod_1.z.string().min(8).max(255),
    }),
});
// user status update validation schema
const updateUserStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.nativeEnum(client_1.UserStatus),
    }),
});
// user role update validation schema
const changeUserRoleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.nativeEnum(client_1.UserRole),
    }),
});
exports.userValidationSchema = {
    createUserValidationSchema,
    loginUserValidationSchema,
    updateUserProfileValidationSchema,
    changeUserPasswordValidationSchema,
    updateUserStatusValidationSchema,
    changeUserRoleValidationSchema,
};
