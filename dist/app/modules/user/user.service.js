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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const generateToken_1 = require("../../utils/generateToken");
const prisma_1 = require("../../utils/prisma");
// create a new user
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile } = user, userData = __rest(user, ["profile"]);
    // hash the password
    const hashPassword = yield bcrypt_1.default.hash(userData.password, config_1.config.salt_round);
    return prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield tx.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashPassword }),
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        yield tx.userProfile.create({
            data: Object.assign(Object.assign({}, profile), { userId: newUser.id }),
        });
        return newUser;
    }));
});
// login a user into the system
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    // generate token
    const token = (0, generateToken_1.generateToken)({ id: user.id, email: user.email }, config_1.config.jwt_secret, config_1.config.expiresIn);
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    return Object.assign(Object.assign({}, userWithoutPassword), { token });
});
// get user profile
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
// update user profile
const updateUserProfile = (userId, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = profile, userWithoutPassword = __rest(profile, ["password"]);
    if (password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password cannot be updated here");
    }
    yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    return prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: userWithoutPassword,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
// export user service
exports.UserService = {
    createUserIntoDB,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
