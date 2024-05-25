import { z } from "zod";

const tripCreateValidationSchema = z.object({
  body: z.object({
    destination: z.string({
      required_error: "Destination is required",
    }),
    startDate: z
      .string({
        required_error: "Start date is required in YYYY-MM-DD format",
        invalid_type_error: "Invalid date format. please use YYYY-MM-DD",
      })
      .refine((value) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      }),
    endDate: z
      .string({
        required_error: "End date is required in format YYYY-MM-DD",
        invalid_type_error: "Invalid date format. please use YYYY-MM-DD",
      })
      .refine((value) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      }),
    budget: z.number().int().positive(),
    activities: z.array(z.string()).nonempty(),
  }),
});

export const TripValidation = {
  tripCreateValidationSchema,
};
