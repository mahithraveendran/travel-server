"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
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
        profile: zod_1.z.object({
            bio: zod_1.z.string().max(255),
            age: zod_1.z.number().int().positive(),
        }, {
            required_error: "Profile field is required",
        }),
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
exports.userValidationSchema = {
    createUserValidationSchema,
    loginUserValidationSchema,
    updateUserProfileValidationSchema,
};
