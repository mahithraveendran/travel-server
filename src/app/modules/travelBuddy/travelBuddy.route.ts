import express from "express";
import { IUserRole } from "../../../types";
import authGuard from "../../middleware/authGuard";
import requestValidation from "../../middleware/requestValidation";
import { TravelBuddyController } from "./travelBuddy.controller";
import { TravelBuddyValidation } from "./travelBuddy.validation";

const router = express.Router();

// send travel buddy request
router
  .route("/:tripId")
  .get(authGuard(), TravelBuddyController.getPotentialTravelBuddies);

// check user already send travel buddy request
router
  .route("/:tripId/check")
  .get(
    authGuard(IUserRole.USER),
    TravelBuddyController.checkTravelBuddyRequest
  );

router
  .route("/:buddyId/respond")
  .put(
    authGuard(),
    requestValidation(TravelBuddyValidation.travelBuddyResponseValidation),
    TravelBuddyController.respondToTravelBuddyRequest
  );

export const travelBuddyRoutes = router;
