import { readFileSync } from "fs";
import path from "path";
const jsonPath = path.join(__dirname, "..", "..", "json", "template.json");

const resetPassword = async (link: any) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const filePath: any = readFileSync(jsonPath);

      if (!filePath) throw new Error("File Not Found");

      if (filePath) {
        let file = JSON.parse(filePath);
        if (link) {
          let reset = file.resetPassword.replace("#link", link);
          return reset;
        }
      }
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};

const newUser = async (user: any, link: any) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const filePath: any = readFileSync(jsonPath);
      if (!filePath) throw new Error("File Not Found");

      if (filePath) {
        let file = JSON.parse(filePath);
        if (user) {
          let users = file.newUser.replace("#name", user);
          users = users.replace("#link", link);
          resolve(users);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default { resetPassword, newUser };
