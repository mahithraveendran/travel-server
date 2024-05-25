import { Status } from "@prisma/client";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../utils/prisma";

// get potential travel buddies for specific trip
const getPotentialTravelBuddies = async (tripId: string) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const travelBuddies = await prisma.travelBuddy.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return travelBuddies;
};

// response to travel buddy request
const respondToTravelBuddyRequest = async (
  buddyId: string,
  tripId: string,
  status: Status
) => {
  const travelBuddy = await prisma.travelBuddy.findUniqueOrThrow({
    where: {
      id: buddyId,
      tripId,
    },
  });

  if (travelBuddy.status !== Status.PENDING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Travel buddy request already responded to"
    );
  }

  return await prisma.travelBuddy.update({
    where: {
      id: buddyId,
    },
    data: {
      status,
    },
  });
};

// check the user is already send a travel buddy request
const checkTravelBuddyRequest = async (tripId: string, userId: string) => {
  console.log(tripId, userId);

  return await prisma.travelBuddy.findFirst({
    where: {
      tripId,
      userId,
    },
  });
};

export const TravelBuddyService = {
  getPotentialTravelBuddies,
  respondToTravelBuddyRequest,
  checkTravelBuddyRequest,
};
