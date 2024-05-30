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
exports.TravelBuddyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const travelBuddy_service_1 = require("./travelBuddy.service");
const getPotentialTravelBuddies = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const travelBuddies = yield travelBuddy_service_1.TravelBuddyService.getPotentialTravelBuddies(tripId);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Potential travel buddies retrieved successfully",
        data: travelBuddies,
    });
}));
// response to travel buddy request
const respondToTravelBuddyRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const { status, tripId } = req.body;
    const respondedBuddy = yield travelBuddy_service_1.TravelBuddyService.respondToTravelBuddyRequest(buddyId, tripId, status);
    if (!respondedBuddy) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Travel buddy request failed to respond",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Travel buddy request responded successfully",
        data: respondedBuddy,
    });
}));
// check if user is a potential travel buddy
const checkTravelBuddyRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const { id } = req.user;
    console.log({ tripId, id });
    const isPotentialBuddy = yield travelBuddy_service_1.TravelBuddyService.checkTravelBuddyRequest(tripId, id);
    if (!isPotentialBuddy) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_1.default.OK,
            message: "User is not a potential travel buddy",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User is a potential travel buddy",
        data: isPotentialBuddy,
    });
}));
exports.TravelBuddyController = {
    getPotentialTravelBuddies,
    respondToTravelBuddyRequest,
    checkTravelBuddyRequest,
};
