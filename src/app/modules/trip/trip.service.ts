import { Prisma, TravelType, Trip } from "@prisma/client";
import { IUser } from "../../middleware/jwtUser";
import { prisma } from "../../utils/prisma";

const createTripIntoDB = async (trip: Trip, user: IUser): Promise<Trip> => {
  return await prisma.trip.create({ data: { ...trip, userId: user.id } });
};

// get paginated and filtered trips
// Query Parameters for API Requests:

// When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

// destination: (Optional) Filter trips by destination.
// startDate: (Optional) Filter trips by start date.
// endDate: (Optional) Filter trips by end date.
// budget: (Optional) Filter trips by budget range. Example: ?minBudget=100&maxBudget=10000
// searchTerm: (Optional) Searches for trips based on a keyword or phrase. Only applicable to the following fields: destination, budget, etc.
// page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
// limit: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
// sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: destination, budget. Example: ?sortBy=budget
// sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc

interface IQuery {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  destination: string;
  startDate: string;
  endDate: string;
  minBudget: number;
  maxBudget: number;
  searchTerm: string;
  type: TravelType;
  description: string;
}

const getPaginatedAndFilteredTrips = async (query: Partial<IQuery>) => {
  console.log({ fromService: query });

  const {
    page = 1,
    limit = 10,
    sortBy = "budget",
    sortOrder = "asc",
    minBudget,
    maxBudget,
    searchTerm,
    type,
    ...filterData
  } = query;

  const conditions: Prisma.TripWhereInput[] = [];

  // filter trips by minBudget and maxBudget
  if (minBudget && maxBudget) {
    conditions.push({
      budget: {
        gte: Number(minBudget),
        lte: Number(maxBudget),
      },
    });
  }

  if (minBudget) {
    conditions.push({
      budget: {
        gte: Number(minBudget),
      },
    });
  }

  if (maxBudget) {
    conditions.push({
      budget: {
        lte: Number(maxBudget),
      },
    });
  }

  // filter trips by travel type
  if (type) {
    conditions.push({
      type: {
        equals: type,
      },
    });
  }

  // add text search for description
  if (query.description) {
    conditions.push({
      description: {
        contains: query.description,
        mode: "insensitive",
      },
    });
  }

  // searchTerms
  if (searchTerm) {
    conditions.push({
      OR: [
        isNaN(parseInt(searchTerm as string))
          ? {
              destination: {
                contains: searchTerm,
                mode: "insensitive",
              },
            }
          : {
              budget: {
                equals: parseInt(searchTerm as string),
              },
            },
      ],
    });
  }

  // Filter trips by filterData
  if (Object.keys(filterData).length > 0) {
    Object.keys(filterData).forEach((key) => {
      conditions.push({
        [key as keyof typeof filterData]: {
          contains: filterData[key as keyof typeof filterData],
          mode: "insensitive",
        },
      });
    });
  }

  // calculate the skip values
  const skip = (Number(page) - 1) * Number(limit);

  console.log();

  const whereConditions: Prisma.TripWhereInput = { AND: conditions };

  console.dir({ query, conditions, whereConditions }, { depth: Infinity });

  const result = await prisma.trip.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          userProfile: {
            select: {
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      [sortBy as string]: sortOrder,
    },
    take: Number(limit),
    skip,
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

// send travel buddy request
const travelBuddyRequest = async (tripId: string, userId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const requestedTravelBuddy = await prisma.travelBuddy.create({
    data: {
      tripId,
      userId,
    },
  });

  return requestedTravelBuddy;
};

// get single trip by id
const getTripById = async (id: string) => {
  return await prisma.trip.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

// update trip by id
const updateTripById = async (id: string, trip: Partial<Trip>) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return await prisma.trip.update({
    where: {
      id,
    },
    data: trip,
  });
};

// delete trip by id
const deleteTripById = async (id: string) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // delete a trip by id and if the trip id is exist the travel buddy collection will be deleted automatically
  return prisma.$transaction(async (tx) => {
    const travelBuddyWithTrip = await tx.travelBuddy.deleteMany({
      where: {
        tripId: id,
      },
    });

    return await tx.trip.delete({
      where: {
        id,
      },
    });
  });
};

// get all travel buddies for a user
const getMyTravelBuddies = async (userId: string) => {
  return await prisma.travelBuddy.findMany({
    where: {
      userId,
    },
    include: {
      trip: true,
    },
  });
};

// get all trip which is posted by a user
const getMyTrips = async (userId: string) => {
  return await prisma.trip.findMany({
    where: {
      userId,
    },
  });
};

// export the trip service
export const TripService = {
  createTripIntoDB,
  getTripById,
  getPaginatedAndFilteredTrips,
  travelBuddyRequest,
  updateTripById,
  deleteTripById,
  getMyTravelBuddies,
  getMyTrips,
};
