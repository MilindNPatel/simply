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
const nodemailer_1 = __importDefault(require("nodemailer"));
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;
const mailer = (email, text, subject) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const host = MAIL_HOST || "";
            const port = MAIL_PORT ? parseInt(MAIL_PORT) : 587;
            const user = MAIL_USER || "";
            const pass = MAIL_PASSWORD || "";
            const transporter = nodemailer_1.default.createTransport({
                host: host,
                port: port,
                secure: false,
                auth: {
                    user: user,
                    pass: pass,
                },
            });
            let info = yield transporter.sendMail({
                from: "demotvapp@gmail.com",
                to: email,
                subject: subject,
                text: text,
            });
            resolve(info);
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.default = mailer;
//# sourceMappingURL=mailer.js.map