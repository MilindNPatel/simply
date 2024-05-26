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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
var gm = require("gm").subClass({
    imageMagick: true,
});
const createThumbnail = (file_data) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            file_data.forEach((file) => {
                const { filename, path, destination } = file;
                var readStream = fs_1.createReadStream(path);
                gm(readStream)
                    .resize(250, 250)
                    .noProfile()
                    .write(`${destination}thumbnails/${filename}`, (err) => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.default = createThumbnail;
//# sourceMappingURL=thumbnail.js.map