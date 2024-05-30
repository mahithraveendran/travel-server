"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const trip_service_1 = require("./trip.service");
const createTrip = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = req.body;
    const user = req.user;
    const createdTrip = yield trip_service_1.TripService.createTripIntoDB(trip, user);
    if (!createdTrip) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Trip not created",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Trip created successfully",
        data: createdTrip,
    });
}));
// get paginated and filtered trips
const getPaginatedAndFilteredTrips = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const queryKeys = [
        "page",
        "limit",
        "sortBy",
        "sortOrder",
        "destination",
        "startDate",
        "endDate",
        "minBudget",
        "maxBudget",
        "searchTerm",
    ];
    const pickedQuery = Object.keys(query).map((key) => {
        if (queryKeys.includes(key)) {
            return { [key]: query[key] };
        }
    });
    const filteredQuery = Object.assign({}, ...pickedQuery);
    const trips = yield trip_service_1.TripService.getPaginatedAndFilteredTrips(filteredQuery);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trips retrieved successfully",
        meta: trips.meta,
        data: trips.data,
    });
}));
// send travel buddy request
const travelBuddyRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const { userId } = req.body;
    const travelBuddy = yield trip_service_1.TripService.travelBuddyRequest(tripId, userId);
    if (!travelBuddy) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Travel buddy request failed",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Travel buddy request sent successfully",
        data: travelBuddy,
    });
}));
// get single trip by id
const getTripById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const trip = yield trip_service_1.TripService.getTripById(id);
    if (!trip) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Trip not found",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip retrieved successfully",
        data: trip,
    });
}));
// update trip by id
const updateTripById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const trip = req.body;
    const updatedTrip = yield trip_service_1.TripService.updateTripById(id, trip);
    if (!updatedTrip) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Trip not updated",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip updated successfully",
        data: updatedTrip,
    });
}));
// delete trip by id
const deleteTripById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedTrip = yield trip_service_1.TripService.deleteTripById(id);
    if (!deletedTrip) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Trip not deleted",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trip deleted successfully",
        data: deletedTrip,
    });
}));
// get travel buddies for a user
const getMyTravelBuddies = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const travelBuddies = yield trip_service_1.TripService.getMyTravelBuddies(user.id);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travel buddies retrieved successfully",
        data: travelBuddies,
    });
}));
// get all trip which is posted by a user
const getMyTrips = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const trips = yield trip_service_1.TripService.getMyTrips(user.id);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Trips retrieved successfully",
        data: trips,
    });
}));
exports.TripController = {
    createTrip,
    getTripById,
    getPaginatedAndFilteredTrips,
    travelBuddyRequest,
    updateTripById,
    deleteTripById,
    getMyTravelBuddies,
    getMyTrips,
};
