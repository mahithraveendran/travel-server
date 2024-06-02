"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = require("./app/routes");
// create app
const app = (0, express_1.default)();
// use middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://dream-destination-travel.vercel.app",
    ],
    credentials: true,
}));
// default route
app.get("/", (req, res) => {
    res.json({ message: "Travel buddy server is running..." });
});
// use routes
app.use("/api", routes_1.rootRouter);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
