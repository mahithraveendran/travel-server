import express from "express";
import authGuard from "../../middleware/authGuard";
import requestValidation from "../../middleware/requestValidation";
import { TravelBuddyController } from "./travelBuddy.controller";
import { TravelBuddyValidation } from "./travelBuddy.validation";

const router = express.Router();

// send travel buddy request
router
  .route("/:tripId")
  .get(authGuard(), TravelBuddyController.getPotentialTravelBuddies);

router
  .route("/:buddyId/respond")
  .put(
    authGuard(),
    requestValidation(TravelBuddyValidation.travelBuddyResponseValidation),
    TravelBuddyController.respondToTravelBuddyRequest
  );

export const travelBuddyRoutes = router;
