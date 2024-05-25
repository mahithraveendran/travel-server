"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidation = void 0;
const zod_1 = require("zod");
const tripCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string({
            required_error: "Destination is required",
        }),
        startDate: zod_1.z
            .string({
            required_error: "Start date is required in YYYY-MM-DD format",
            invalid_type_error: "Invalid date format. please use YYYY-MM-DD",
        })
            .refine((value) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
        }),
        endDate: zod_1.z
            .string({
            required_error: "End date is required in format YYYY-MM-DD",
            invalid_type_error: "Invalid date format. please use YYYY-MM-DD",
        })
            .refine((value) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
        }),
        budget: zod_1.z.number().int().positive(),
        activities: zod_1.z.array(zod_1.z.string()).nonempty(),
    }),
});
exports.TripValidation = {
    tripCreateValidationSchema,
};
