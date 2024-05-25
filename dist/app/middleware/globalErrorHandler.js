"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const simplifiedError = (err) => {
    let success = false;
    let message = err.message || "Internal server error";
    let errorDetails = err.errorDetails || err;
    let statusCode = err.statusCode || 500;
    if ((err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
        return (0, handleZodError_1.default)(err);
    }
    return { success, message, errorDetails, statusCode };
};
const globalErrorHandler = (err, req, res, next) => {
    // simplified error
    const { success, message, errorDetails, statusCode } = simplifiedError(err);
    res.status(statusCode).json({
        success: success,
        message: message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
