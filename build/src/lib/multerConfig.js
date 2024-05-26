"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
require("dotenv").config({ path: ".env" });
const path_1 = __importDefault(require("path"));
// upload file path
const FILE_PATH = process.env.FILE_PATH || "uploads";
const removeFile = (file) => {
    try {
        file.forEach((removeFile) => {
            `${FILE_PATH}/${removeFile}`;
        });
        return;
    }
    catch (err) {
        return err;
    }
};
// configure multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${FILE_PATH}/`);
    },
    filename: (req, file, cb) => {
        var filename = file.originalname;
        cb(null, Date.now() + "_" + filename);
    },
});
const upload = multer_1.default({
    storage: storage,
    limits: { fileSize: 10485760 },
    fileFilter: (req, file, cb) => {
        const { mimetype, originalname } = file;
        var ext = path_1.default.extname(originalname);
        if (mimetype == "image/png" ||
            mimetype == "image/jpg" ||
            mimetype == "image/jpeg" ||
            ext === ".pdf" ||
            ext === ".docx" ||
            ext === ".doc") {
            cb(null, true);
        }
        else {
            return cb(new Error("Allowed only .PNG, .JPG, .PDF, .DOC, .DOCX"));
        }
    },
});
exports.default = { upload, storage, removeFile };
//# sourceMappingURL=multerConfig.js.map