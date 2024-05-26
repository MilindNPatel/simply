"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const enum_1 = require("../enum");
const middlewares_1 = require("../middlewares");
const passport_1 = __importDefault(require("passport"));
const validations_1 = require("../validations");
const userCont = new controllers_1.userController();
exports.default = express_1.Router()
    .post(enum_1.ROUTER_LINKS.USER.SIGNUP, middlewares_1.Validate(validations_1.userSchame.register), userCont.signup)
    .post(enum_1.ROUTER_LINKS.USER.SIGNIN, middlewares_1.Validate(validations_1.userSchame.login), userCont.signin)
    .post(enum_1.ROUTER_LINKS.USER.CHANGE_PASSWORD, middlewares_1.Auth(passport_1.default), middlewares_1.Validate(validations_1.userSchame.changePassword), userCont.changePassword)
    .post(enum_1.ROUTER_LINKS.USER.FORGOT_PASSWORD, middlewares_1.Validate(validations_1.userSchame.forgotPassword), userCont.forgotPassword)
    .post(enum_1.ROUTER_LINKS.USER.RESET_PASSWORD, middlewares_1.Validate(validations_1.userSchame.resetPassword), userCont.resetPassword)
    .get(enum_1.ROUTER_LINKS.USER.GET_USERS, middlewares_1.Auth(passport_1.default), userCont.getUsers)
    .get(enum_1.ROUTER_LINKS.USER.GET_USER_BY_ID, middlewares_1.Auth(passport_1.default), userCont.getUserById)
    .put(enum_1.ROUTER_LINKS.USER.UPDATE_USER, middlewares_1.Auth(passport_1.default), middlewares_1.Validate(validations_1.userSchame.updateUser), userCont.updateUser)
    .post(enum_1.ROUTER_LINKS.USER.UPDATE_STATUS, middlewares_1.Auth(passport_1.default), middlewares_1.Validate(validations_1.userSchame.updateStatus), userCont.updateStatus);
//# sourceMappingURL=user.js.map