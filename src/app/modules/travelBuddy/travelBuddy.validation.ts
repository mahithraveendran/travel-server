import { Status } from "@prisma/client";
import { z } from "zod";

const travelBuddyResponseValidation = z.object({
  body: z.object({
    status: z.enum([Status.APPROVED, Status.REJECTED, Status.PENDING], {
      required_error: "Status is required",
    }),
    tripId: z
      .string({
        required_error: "Trip ID is required",
      })
      .uuid(),
  }),
});

export const TravelBuddyValidation = {
  travelBuddyResponseValidation,
};
