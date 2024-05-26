import { createReadStream } from "fs";
var gm = require("gm").subClass({
  imageMagick: true,
});

const createThumbnail = (file_data: any) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      file_data.forEach((file: any) => {
        const { filename, path, destination } = file;
        var readStream = createReadStream(path);
        gm(readStream)
          .resize(250, 250)
          .noProfile()
          .write(`${destination}thumbnails/${filename}`, (err: any) => {
            if (err) {
              throw new Error(err);
            }
          });
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export default createThumbnail;
