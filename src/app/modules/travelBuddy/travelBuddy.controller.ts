import httpStatus from "http-status";
import { IUser } from "../../middleware/jwtUser";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TravelBuddyService } from "./travelBuddy.service";

const getPotentialTravelBuddies = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const travelBuddies = await TravelBuddyService.getPotentialTravelBuddies(
    tripId
  );

  console.log('fetching travel buddy...')

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Potential travel buddies retrieved successfully",
    data: travelBuddies,
  });
});

// response to travel buddy request
const respondToTravelBuddyRequest = catchAsync(async (req, res) => {
  const { buddyId } = req.params;
  const { status, tripId } = req.body;

  const respondedBuddy = await TravelBuddyService.respondToTravelBuddyRequest(
    buddyId,
    tripId,
    status
  );

  if (!respondedBuddy) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Travel buddy request failed to respond",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel buddy request responded successfully",
    data: respondedBuddy,
  });
});

// check if user is a potential travel buddy
const checkTravelBuddyRequest = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { id } = req.user as IUser;

  console.log({ tripId, id });

  const isPotentialBuddy = await TravelBuddyService.checkTravelBuddyRequest(
    tripId,
    id
  );

  if (!isPotentialBuddy) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: "User is not a potential travel buddy",
      data: null,
    });
  }

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is a potential travel buddy",
    data: isPotentialBuddy,
  });
});

export const TravelBuddyController = {
  getPotentialTravelBuddies,
  respondToTravelBuddyRequest,
  checkTravelBuddyRequest,
};
