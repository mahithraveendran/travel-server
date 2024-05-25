"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const travelBuddy_route_1 = require("../modules/travelBuddy/travelBuddy.route");
const trip_route_1 = require("../modules/trip/trip.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const routes = [
    {
        path: "/",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: trip_route_1.tripRoutes,
    },
    {
        path: "/travel-buddies",
        route: travelBuddy_route_1.travelBuddyRoutes,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.rootRouter = router;
