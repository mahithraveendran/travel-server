import express from "express";
import authGuard from "../../middleware/authGuard";
import requestValidation from "../../middleware/requestValidation";
import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";

const router = express.Router();

// create trip route
router
  .route("/trips")
  .post(
    authGuard(),
    requestValidation(TripValidation.tripCreateValidationSchema),
    TripController.createTrip
  )
  .get(TripController.getPaginatedAndFilteredTrips);

// send travel buddy request
router
  .route("/trip/:tripId/request")
  .post(authGuard(), TripController.travelBuddyRequest);

export const tripRoutes = router;
