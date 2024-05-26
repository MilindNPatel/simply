"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const enum_1 = require("../enum");
const register = joi_1.default.object().keys({
    fn: joi_1.default.string().required(),
    un: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    pwd: joi_1.default.string().required(),
    role: joi_1.default.string()
        .valid(enum_1.CONSTANTS.ROLE.SUPER_ADMIN, enum_1.CONSTANTS.ROLE.ADMIN, enum_1.CONSTANTS.ROLE.USER)
        .required(),
    add: joi_1.default.string().required(),
});
const login = joi_1.default.object().keys({
    un: joi_1.default.string().required(),
    pwd: joi_1.default.string().required(),
});
const changePassword = joi_1.default.object().keys({
    pwd: joi_1.default.string().required(),
    nPwd: joi_1.default.string().required(),
});
const forgotPassword = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
});
const resetPassword = joi_1.default.object().keys({
    nPwd: joi_1.default.string().required(),
});
const updateUser = joi_1.default.object().keys({
    fn: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    add: joi_1.default.string().required(),
});
const updateStatus = joi_1.default.object().keys({
    _id: joi_1.default.string().required(),
});
exports.default = {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    updateUser,
    updateStatus,
};
//# sourceMappingURL=user.js.map