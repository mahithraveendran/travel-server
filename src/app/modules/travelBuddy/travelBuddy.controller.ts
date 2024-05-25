import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TravelBuddyService } from "./travelBuddy.service";

const getPotentialTravelBuddies = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const travelBuddies = await TravelBuddyService.getPotentialTravelBuddies(
    tripId
  );

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

export const TravelBuddyController = {
  getPotentialTravelBuddies,
  respondToTravelBuddyRequest,
};
