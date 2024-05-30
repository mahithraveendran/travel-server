"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidation = void 0;
const zod_1 = require("zod");
// model Trip {
//   id          String   @id @default(uuid())
//   userId      String
//   destination String
//   startDate   String
//   endDate     String
//   budget      Int
//   activities  String[]
//   image       String?
//   description String?
//   photos      String[]
//   type        TravelType  @default(ADVENTURE)
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   user        User          @relation(fields: [userId], references: [id])
//   travelBuddy TravelBuddy[]
// }
// create trip validation schema
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
// update trip validation schema
const tripUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string().optional(),
        startDate: zod_1.z
            .string()
            .refine((value) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
        })
            .optional(),
        endDate: zod_1.z
            .string()
            .refine((value) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
        })
            .optional(),
        budget: zod_1.z.number().int().positive().optional(),
        activities: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
    }),
});
exports.TripValidation = {
    tripCreateValidationSchema,
    tripUpdateValidationSchema,
};
