"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const requestValidation_1 = __importDefault(require("../../middleware/requestValidation"));
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const router = express_1.default.Router();
// create trip route
router
    .route("/trips")
    .post((0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, requestValidation_1.default)(trip_validation_1.TripValidation.tripCreateValidationSchema), trip_controller_1.TripController.createTrip)
    .get(trip_controller_1.TripController.getPaginatedAndFilteredTrips);
// get single trip by id
router
    .route("/trips/:id")
    .get(trip_controller_1.TripController.getTripById)
    .put((0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, requestValidation_1.default)(trip_validation_1.TripValidation.tripUpdateValidationSchema), trip_controller_1.TripController.updateTripById)
    .delete(trip_controller_1.TripController.deleteTripById);
// send travel buddy request
router
    .route("/trip/:tripId/request")
    .post((0, authGuard_1.default)(client_1.UserRole.USER), trip_controller_1.TripController.travelBuddyRequest);
// get travel buddies for a user
router
    .route("/trip/my-travel-buddies")
    .get((0, authGuard_1.default)(client_1.UserRole.USER), trip_controller_1.TripController.getMyTravelBuddies);
// get all trip which is posted by a user
router
    .route("/trip/my-trips")
    .get((0, authGuard_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), trip_controller_1.TripController.getMyTrips);
exports.tripRoutes = router;
