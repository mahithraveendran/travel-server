import express from "express";
import { IUserRole } from "../../../types";
import authGuard from "../../middleware/authGuard";
import requestValidation from "../../middleware/requestValidation";
import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";

const router = express.Router();

// create trip route
router
  .route("/trips")
  .post(
    authGuard(IUserRole.ADMIN, IUserRole.USER),
    requestValidation(TripValidation.tripCreateValidationSchema),
    TripController.createTrip
  )
  .get(TripController.getPaginatedAndFilteredTrips);

// get single trip by id
router
  .route("/trips/:id")
  .get(TripController.getTripById)
  .put(
    authGuard(IUserRole.ADMIN, IUserRole.USER),
    requestValidation(TripValidation.tripUpdateValidationSchema),
    TripController.updateTripById
  )
  .delete(TripController.deleteTripById);

// send travel buddy request
router
  .route("/trip/:tripId/request")
  .post(authGuard(IUserRole.USER), TripController.travelBuddyRequest);

// get travel buddies for a user
router
  .route("/trip/my-travel-buddies")
  .get(authGuard(IUserRole.USER), TripController.getMyTravelBuddies);

export const tripRoutes = router;
