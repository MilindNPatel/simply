import multer from "multer";
require("dotenv").config({ path: ".env" });
import path from "path";

// upload file path
const FILE_PATH = process.env.FILE_PATH || "uploads";

const removeFile = (file: any) => {
  try {
    file.forEach((removeFile: any) => {
      `${FILE_PATH}/${removeFile}`;
    });
    return;
  } catch (err) {
    return err;
  }
};

// configure multer
const storage = multer.diskStorage({
  destination: (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, `${FILE_PATH}/`);
  },
  filename: (
    req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: string) => void
  ) => {
    var filename = file.originalname;
    cb(null, Date.now() + "_" + filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10485760 },
  fileFilter: (req: any, file: any, cb: any) => {
    const { mimetype, originalname } = file;
    var ext = path.extname(originalname);
    if (
      mimetype == "image/png" ||
      mimetype == "image/jpg" ||
      mimetype == "image/jpeg" ||
      ext === ".pdf" ||
      ext === ".docx" ||
      ext === ".doc"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Allowed only .PNG, .JPG, .PDF, .DOC, .DOCX"));
    }
  },
});

export default { upload, storage, removeFile };
