"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const travelBuddyResponseValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.Status.APPROVED, client_1.Status.REJECTED, client_1.Status.PENDING], {
            required_error: "Status is required",
        }),
        tripId: zod_1.z
            .string({
            required_error: "Trip ID is required",
        })
            .uuid(),
    }),
});
exports.TravelBuddyValidation = {
    travelBuddyResponseValidation,
};
