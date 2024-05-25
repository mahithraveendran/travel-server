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
exports.TravelBuddyService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = require("../../utils/prisma");
// get potential travel buddies for specific trip
const getPotentialTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.trip.findUniqueOrThrow({
        where: {
            id: tripId,
        },
    });
    const travelBuddies = yield prisma_1.prisma.travelBuddy.findMany({
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
});
// response to travel buddy request
const respondToTravelBuddyRequest = (buddyId, tripId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const travelBuddy = yield prisma_1.prisma.travelBuddy.findUniqueOrThrow({
        where: {
            id: buddyId,
            tripId,
        },
    });
    if (travelBuddy.status !== client_1.Status.PENDING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Travel buddy request already responded to");
    }
    return yield prisma_1.prisma.travelBuddy.update({
        where: {
            id: buddyId,
        },
        data: {
            status,
        },
    });
});
exports.TravelBuddyService = {
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
};
