import { z } from "zod";

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

// update trip validation schema
const tripUpdateValidationSchema = z.object({
  body: z.object({
    destination: z.string().optional(),
    startDate: z
      .string()
      .refine((value) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      })
      .optional(),
    endDate: z
      .string()

      .refine((value) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      })
      .optional(),
    budget: z.number().int().positive().optional(),
    activities: z.array(z.string()).nonempty().optional(),
  }),
});

export const TripValidation = {
  tripCreateValidationSchema,
  tripUpdateValidationSchema,
};
