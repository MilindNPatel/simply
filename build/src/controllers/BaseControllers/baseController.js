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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRETKEY, SALT } = process.env;
class BaseController {
    constructor() {
        this.jwt = jsonwebtoken_1.default;
        this.salt = SALT ? parseInt(SALT) : 0;
        this.secretKey = SECRETKEY ? SECRETKEY : "";
        this.extractToken = (req) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // let data = null;
                    // if (req.headers && req.headers.authorization) {
                    let authorization = req.headers && req.headers.authorization
                        ? req.headers.authorization.split(" ")[1]
                        : "";
                    // try {
                    let data = yield this.jwt.verify(authorization, this.secretKey);
                    // } catch (e) {
                    //   return;
                    // }
                    resolve(data);
                    // }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=baseController.js.map