"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const requestValidation_1 = __importDefault(require("../../middleware/requestValidation"));
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const router = express_1.default.Router();
// create trip route
router
    .route("/trips")
    .post((0, authGuard_1.default)(), (0, requestValidation_1.default)(trip_validation_1.TripValidation.tripCreateValidationSchema), trip_controller_1.TripController.createTrip)
    .get(trip_controller_1.TripController.getPaginatedAndFilteredTrips);
// send travel buddy request
router
    .route("/trip/:tripId/request")
    .post((0, authGuard_1.default)(), trip_controller_1.TripController.travelBuddyRequest);
exports.tripRoutes = router;
