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
exports.sendJWTErrorResponse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const catchAsync_1 = require("../utils/catchAsync");
const prisma_1 = require("../utils/prisma");
const authGuard = () => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            return (0, exports.sendJWTErrorResponse)(res);
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
        if (!decodedToken) {
            return (0, exports.sendJWTErrorResponse)(res);
        }
        console.log("decodedToken", decodedToken);
        try {
            const isUserExist = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: decodedToken.id,
                },
            });
            if (!isUserExist) {
                return (0, exports.sendJWTErrorResponse)(res);
            }
            req.user = decodedToken;
            next();
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return (0, exports.sendJWTErrorResponse)(res);
            }
            else if (error.name === "JsonWebTokenError") {
                return (0, exports.sendJWTErrorResponse)(res);
            }
            else {
                return (0, exports.sendJWTErrorResponse)(res);
            }
        }
    }));
};
exports.default = authGuard;
// send jwt error response
const sendJWTErrorResponse = (res) => {
    return res.status(http_status_1.default.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized Access",
        errorDetails: null,
    });
};
exports.sendJWTErrorResponse = sendJWTErrorResponse;
