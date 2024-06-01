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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const prisma_1 = require("../../utils/prisma");
const createTripIntoDB = (trip, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.trip.create({ data: Object.assign(Object.assign({}, trip), { userId: user.id }) });
});
const getPaginatedAndFilteredTrips = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ fromService: query });
    const { page = 1, limit = 10, sortBy = "budget", sortOrder = "asc", minBudget, maxBudget, searchTerm, type } = query, filterData = __rest(query, ["page", "limit", "sortBy", "sortOrder", "minBudget", "maxBudget", "searchTerm", "type"]);
    const conditions = [];
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
    // searchTerms
    if (searchTerm) {
        conditions.push({
            OR: [
                isNaN(parseInt(searchTerm))
                    ? {
                        destination: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    }
                    : {
                        budget: {
                            equals: parseInt(searchTerm),
                        },
                    },
            ],
        });
    }
    // Filter trips by filterData
    if (Object.keys(filterData).length > 0) {
        Object.keys(filterData).forEach((key) => {
            conditions.push({
                [key]: {
                    contains: filterData[key],
                    mode: "insensitive",
                },
            });
        });
    }
    // calculate the skip values
    const skip = (Number(page) - 1) * Number(limit);
    console.log();
    const whereConditions = { AND: conditions };
    console.dir({ query, conditions, whereConditions }, { depth: Infinity });
    const result = yield prisma_1.prisma.trip.findMany({
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
            [sortBy]: sortOrder,
        },
        take: Number(limit),
        skip,
    });
    const total = yield prisma_1.prisma.trip.count({
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
});
// send travel buddy request
const travelBuddyRequest = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    yield prisma_1.prisma.trip.findUniqueOrThrow({
        where: {
            id: tripId,
        },
    });
    const requestedTravelBuddy = yield prisma_1.prisma.travelBuddy.create({
        data: {
            tripId,
            userId,
        },
    });
    return requestedTravelBuddy;
});
// get single trip by id
const getTripById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.trip.findUnique({
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
});
// update trip by id
const updateTripById = (id, trip) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.trip.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return yield prisma_1.prisma.trip.update({
        where: {
            id,
        },
        data: trip,
    });
});
// delete trip by id
const deleteTripById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.trip.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return yield prisma_1.prisma.trip.delete({
        where: {
            id,
        },
    });
});
// get all travel buddies for a user
const getMyTravelBuddies = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.travelBuddy.findMany({
        where: {
            userId,
        },
        include: {
            trip: true,
        },
    });
});
// get all trip which is posted by a user
const getMyTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.trip.findMany({
        where: {
            userId,
        },
    });
});
// export the trip service
exports.TripService = {
    createTripIntoDB,
    getTripById,
    getPaginatedAndFilteredTrips,
    travelBuddyRequest,
    updateTripById,
    deleteTripById,
    getMyTravelBuddies,
    getMyTrips,
};
