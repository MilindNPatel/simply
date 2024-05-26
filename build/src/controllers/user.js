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
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const bcrypt_1 = require("bcrypt");
const models_1 = require("../models");
const BaseControllers_1 = require("./BaseControllers");
const enum_1 = require("../enum");
const lib_1 = require("../lib");
const helpers_1 = require("../helpers");
class User extends BaseControllers_1.BaseController {
    constructor() {
        super();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { un, pwd } = body;
                const checkUser = yield models_1.userModel.findOne({
                    un,
                });
                if (checkUser)
                    throw new Error("Email already exist");
                const hashPass = bcrypt_1.hashSync(pwd, this.salt);
                body.pwd = hashPass;
                body["isActive"] = true;
                const userData = new models_1.userModel(body);
                const createUser = yield userData.save();
                if (!createUser)
                    throw new Error("Error while saving data");
                createUser &&
                    res.status(200).json({
                        success: true,
                        message: "User signup successfully",
                        data: createUser,
                    });
            }
            catch (error) {
                res.status(400).send({
                    error: true,
                    message: error.message,
                });
            }
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { un, pwd } = req.body;
                const checkEmail = yield models_1.userModel.findOne({ un });
                if (!checkEmail)
                    throw new Error("Cannot find user with this email");
                if (!checkEmail.isActive)
                    throw new Error("User is inactive");
                const checkPassword = yield bcrypt_1.compareSync(pwd, checkEmail.pwd);
                if (!checkPassword)
                    throw new Error("Password is wrong, Please check again");
                let userData = {
                    _id: checkEmail._id,
                    email: checkEmail.email,
                    un: checkEmail.un,
                    hostName: req.headers.host,
                    remoteIp: req.connection.remoteAddress,
                };
                const authToken = this.jwt.sign(userData, this.secretKey, {
                    expiresIn: 604800,
                });
                delete userData.remoteIp;
                delete userData.hostName;
                userData = Object.assign(Object.assign({}, userData), { fn: checkEmail.fn });
                res.status(200).json({
                    success: true,
                    message: "User login successfully",
                    data: userData,
                    authToken,
                });
            }
            catch (error) {
                res.status(400).send({ error: true, message: error.message });
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, newPassword } = req.body;
                const tokenData = yield this.extractToken(req);
                const filter = { email: tokenData.email };
                const getUser = yield models_1.userModel.findOne(filter);
                const checkPassword = bcrypt_1.compareSync(password, getUser.password);
                if (!checkPassword)
                    throw new Error("Password is Wrong");
                if (checkPassword && password === newPassword)
                    throw new Error("New Password And Old Password can not be same");
                const hashPassword = bcrypt_1.hashSync(newPassword, this.salt);
                const update = { password: hashPassword };
                const options = { new: true };
                const updatePassword = yield models_1.userModel.findOneAndUpdate(filter, update, options);
                if (!updatePassword)
                    throw new Error("Password not updated");
                res.status(200).json({
                    success: true,
                    message: "Password change successfully",
                });
            }
            catch (error) {
                res.status(400).send({ error: true, message: error.message });
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email)
                    throw new Error("Enter Email To Change Password");
                const token = crypto_random_string_1.default({
                    length: 20,
                    type: "url-safe",
                });
                const date = new Date();
                const expTime = date.getTime() + 600000; // 10 min
                let filter = { email };
                let update = { expTime, token };
                let options = { new: true };
                const user = yield models_1.userModel.updateMany(filter, update, options);
                if (!user)
                    throw new Error("User Not Found");
                let path = `${enum_1.ROUTER_LINKS.USERS}${enum_1.ROUTER_LINKS.USER.RESET_PASSWORD}`;
                let hostName = req.headers.host;
                let link = `${hostName}${path}?token=${token}`;
                let template = yield helpers_1.templates.resetPassword(link);
                if (!template)
                    throw new Error("Template not found");
                let subject = "Reset Password";
                const sendMail = yield lib_1.mailer(email, template, subject);
                if (!sendMail)
                    throw new Error("Error While Sending Mail");
                sendMail &&
                    res.status(200).json({
                        success: true,
                        message: `Password Reset Link Sent to ${email}`,
                    });
            }
            catch (error) {
                res.status(400).send({ error: true, message: error.message });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.query;
                const { newPassword } = req.body;
                if (!newPassword)
                    throw new Error("Enter New Password");
                const verifyToken = yield models_1.userModel.findOne({ token }, { _id: 1, email: 1, token: 1, expTime: 1 });
                if (!verifyToken)
                    throw new Error("Link Not Valid");
                const { expTime, _id, email } = verifyToken;
                const date = new Date().getTime();
                if (date > expTime)
                    throw new Error("Link Expired");
                const hashPassword = bcrypt_1.hashSync(newPassword, this.salt);
                let filter = { _id };
                let update = { password: hashPassword };
                let options = { new: true };
                const updatePassword = yield models_1.userModel.findOneAndUpdate(filter, update, options);
                updatePassword &&
                    res.status(200).json({
                        success: true,
                        message: `Password Updated Successfully for ${email}`,
                    });
            }
            catch (error) {
                res.status(400).send({ error: true, message: error.message });
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.userModel.find();
                if (!users)
                    throw new Error("Error while getting users");
                res.status(200).send({
                    success: true,
                    message: "Users",
                    data: users,
                });
            }
            catch (error) {
                res.status(400).send({
                    error: true,
                    message: error.message,
                });
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const user = yield models_1.userModel.findOne({ _id });
                if (!user)
                    throw new Error("Error while getting user");
                res.status(200).send({
                    success: true,
                    message: "User",
                    data: user,
                });
            }
            catch (error) {
                res.status(400).send({
                    error: true,
                    message: error.message,
                });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, params } = req;
                const tokenData = yield this.extractToken(req);
                console.log(tokenData);
                const filter = params;
                const update = body;
                const options = { new: true };
                const updateUser = yield models_1.userModel.findOneAndUpdate(filter, update, options);
                res.status(200).json({
                    success: true,
                    message: "User Edited Successfully",
                    data: updateUser,
                });
            }
            catch (error) {
                res.status(400).send({
                    error: true,
                    message: error.message,
                });
            }
        });
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = req.body;
                const findUSer = yield models_1.userModel.findOne(filter);
                if (!findUSer)
                    throw new Error("Error while geting user data");
                const update = {
                    isActive: !findUSer.isActive,
                };
                const options = { new: true };
                const updateStatus = yield models_1.userModel.findOneAndUpdate(filter, update, options);
                if (!updateStatus)
                    throw new Error("Error while updateing status");
                res.status(200).send({
                    success: true,
                    message: "User Status Updated Successfully",
                });
            }
            catch (error) {
                res.status(400).send({
                    error: true,
                    message: error.message,
                });
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map