import httpStatus from "http-status";
import { IUser } from "../../middleware/jwtUser";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TripService } from "./trip.service";

const createTrip = catchAsync(async (req, res) => {
  const trip = req.body;
  const user = req.user as IUser;

  const createdTrip = await TripService.createTripIntoDB(trip, user);

  if (!createdTrip) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Trip not created",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Trip created successfully",
    data: createdTrip,
  });
});

// get paginated and filtered trips
const getPaginatedAndFilteredTrips = catchAsync(async (req, res) => {
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

  const trips = await TripService.getPaginatedAndFilteredTrips(filteredQuery);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trips retrieved successfully",
    meta: trips.meta,
    data: trips.data,
  });
});

// send travel buddy request
const travelBuddyRequest = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { userId } = req.body;

  const travelBuddy = await TripService.travelBuddyRequest(tripId, userId);

  if (!travelBuddy) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Travel buddy request failed",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Travel buddy request sent successfully",
    data: travelBuddy,
  });
});

// get single trip by id
const getTripById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const trip = await TripService.getTripById(id);

  if (!trip) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Trip not found",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trip retrieved successfully",
    data: trip,
  });
});

// update trip by id
const updateTripById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const trip = req.body;

  const updatedTrip = await TripService.updateTripById(id, trip);

  if (!updatedTrip) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Trip not updated",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trip updated successfully",
    data: updatedTrip,
  });
});

// delete trip by id
const deleteTripById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedTrip = await TripService.deleteTripById(id);

  if (!deletedTrip) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Trip not deleted",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trip deleted successfully",
    data: deletedTrip,
  });
});

// get travel buddies for a user
const getMyTravelBuddies = catchAsync(async (req, res) => {
  const user = req.user as IUser;

  const travelBuddies = await TripService.getMyTravelBuddies(user.id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel buddies retrieved successfully",
    data: travelBuddies,
  });
});

// get all trip which is posted by a user
const getMyTrips = catchAsync(async (req, res) => {
  const user = req.user as IUser;

  const trips = await TripService.getMyTrips(user.id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Trips retrieved successfully",
    data: trips,
  });
});

export const TripController = {
  createTrip,
  getTripById,
  getPaginatedAndFilteredTrips,
  travelBuddyRequest,
  updateTripById,
  deleteTripById,
  getMyTravelBuddies,
  getMyTrips,
};
