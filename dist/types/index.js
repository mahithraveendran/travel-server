"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelType = exports.IUserRole = void 0;
// define a interface for user roles
var IUserRole;
(function (IUserRole) {
    IUserRole["ADMIN"] = "ADMIN";
    IUserRole["USER"] = "USER";
})(IUserRole || (exports.IUserRole = IUserRole = {}));
// define a travel type interface.
var TravelType;
(function (TravelType) {
    TravelType["BACKPACKING"] = "BACKPACKING";
    TravelType["LUXURY"] = "LUXURY";
    TravelType["ROAD_TRIP"] = "ROAD_TRIP";
    TravelType["VOLUNTEER"] = "VOLUNTEER";
    TravelType["EDUCATIONAL"] = "EDUCATIONAL";
    TravelType["ADVENTURE"] = "ADVENTURE";
    TravelType["FOODIE"] = "FOODIE";
    TravelType["SLOW_TRAVEL"] = "SLOW_TRAVEL";
    TravelType["LEISURE"] = "LEISURE";
    TravelType["BUSINESS"] = "BUSINESS";
    TravelType["OTHER"] = "OTHER";
})(TravelType || (exports.TravelType = TravelType = {}));
