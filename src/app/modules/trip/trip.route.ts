import { UserRole } from "@prisma/client";
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
    authGuard(UserRole.ADMIN, UserRole.USER),
    requestValidation(TripValidation.tripCreateValidationSchema),
    TripController.createTrip
  )
  .get(TripController.getPaginatedAndFilteredTrips);

// get single trip by id
router
  .route("/trips/:id")
  .get(TripController.getTripById)
  .put(
    authGuard(UserRole.ADMIN, UserRole.USER),
    requestValidation(TripValidation.tripUpdateValidationSchema),
    TripController.updateTripById
  )
  .delete(TripController.deleteTripById);

// send travel buddy request
router
  .route("/trip/:tripId/request")
  .post(authGuard(UserRole.USER), TripController.travelBuddyRequest);

// get travel buddies for a user
router
  .route("/trip/my-travel-buddies")
  .get(authGuard(UserRole.USER), TripController.getMyTravelBuddies);

// get all trip which is posted by a user
router
  .route("/trip/my-trips")
  .get(authGuard(UserRole.USER, UserRole.ADMIN), TripController.getMyTrips);

export const tripRoutes = router;
