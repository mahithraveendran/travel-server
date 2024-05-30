"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authGuard_1 = __importDefault(require("../../middleware/authGuard"));
const requestValidation_1 = __importDefault(require("../../middleware/requestValidation"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// create user route
router
    .route("/register")
    .post((0, requestValidation_1.default)(user_validation_1.userValidationSchema.createUserValidationSchema), user_controller_1.UserController.createUser);
// login user route
router
    .route("/login")
    .post((0, requestValidation_1.default)(user_validation_1.userValidationSchema.loginUserValidationSchema), user_controller_1.UserController.loginUser);
// get user profile route
router
    .route("/profile")
    .get((0, authGuard_1.default)(), user_controller_1.UserController.getUserProfile)
    .put((0, authGuard_1.default)(), (0, requestValidation_1.default)(user_validation_1.userValidationSchema.updateUserProfileValidationSchema), user_controller_1.UserController.updateUserProfile);
// change user password route
router
    .route("/change-password")
    .put((0, authGuard_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, requestValidation_1.default)(user_validation_1.userValidationSchema.changeUserPasswordValidationSchema), user_controller_1.UserController.changeUserPassword);
// soft delete a user route
router
    .route("/delete/:userId")
    .delete((0, authGuard_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.softDeleteUser);
// update user status route
router
    .route("/status/:userId")
    .patch((0, authGuard_1.default)(client_1.UserRole.ADMIN), (0, requestValidation_1.default)(user_validation_1.userValidationSchema.updateUserStatusValidationSchema), user_controller_1.UserController.updateUserStatus);
// change user role route
router
    .route("/role/:userId")
    .patch((0, authGuard_1.default)(client_1.UserRole.ADMIN), (0, requestValidation_1.default)(user_validation_1.userValidationSchema.changeUserRoleValidationSchema), user_controller_1.UserController.changeUserRole);
// get all user for only admin
router
    .route("/users")
    .get((0, authGuard_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.getAllUsers);
exports.userRoutes = router;
