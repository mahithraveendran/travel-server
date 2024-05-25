"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelBuddyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const requestValidation_1 = __importDefault(require("../../middleware/requestValidation"));
const travelBuddy_controller_1 = require("./travelBuddy.controller");
const travelBuddy_validation_1 = require("./travelBuddy.validation");
const router = express_1.default.Router();
// send travel buddy request
router
    .route("/:tripId")
    .get((0, authGuard_1.default)(), travelBuddy_controller_1.TravelBuddyController.getPotentialTravelBuddies);
router
    .route("/:buddyId/respond")
    .put((0, authGuard_1.default)(), (0, requestValidation_1.default)(travelBuddy_validation_1.TravelBuddyValidation.travelBuddyResponseValidation), travelBuddy_controller_1.TravelBuddyController.respondToTravelBuddyRequest);
exports.travelBuddyRoutes = router;
