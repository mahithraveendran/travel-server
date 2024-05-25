import express from "express";
import { travelBuddyRoutes } from "../modules/travelBuddy/travelBuddy.route";
import { tripRoutes } from "../modules/trip/trip.route";
import { userRoutes } from "../modules/user/user.route";

const router = express.Router();

const routes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: tripRoutes,
  },
  {
    path: "/travel-buddies",
    route: travelBuddyRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export const rootRouter = router;
