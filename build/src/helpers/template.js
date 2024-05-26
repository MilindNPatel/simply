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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const jsonPath = path_1.default.join(__dirname, "..", "..", "json", "template.json");
const resetPassword = (link) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePath = fs_1.readFileSync(jsonPath);
            if (!filePath)
                throw new Error("File Not Found");
            if (filePath) {
                let file = JSON.parse(filePath);
                if (link) {
                    let reset = file.resetPassword.replace("#link", link);
                    return reset;
                }
            }
            resolve(true);
        }
        catch (error) {
            reject(false);
        }
    }));
});
const newUser = (user, link) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePath = fs_1.readFileSync(jsonPath);
            if (!filePath)
                throw new Error("File Not Found");
            if (filePath) {
                let file = JSON.parse(filePath);
                if (user) {
                    let users = file.newUser.replace("#name", user);
                    users = users.replace("#link", link);
                    resolve(users);
                }
            }
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.default = { resetPassword, newUser };
//# sourceMappingURL=template.js.map