import jwt from "jsonwebtoken";
const { SECRETKEY, SALT } = process.env;

export default class BaseController {
  protected jwt = jwt;
  protected salt: any = SALT ? parseInt(SALT) : 0;
  protected secretKey: any = SECRETKEY ? SECRETKEY : "";

  constructor() {}

  protected extractToken = async (req: any) => {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        // let data = null;
        // if (req.headers && req.headers.authorization) {
        let authorization =
          req.headers && req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : "";
        // try {
        let data = await this.jwt.verify(authorization, this.secretKey);
        // } catch (e) {
        //   return;
        // }
        resolve(data);
        // }
      } catch (error) {
        reject(error);
      }
    });
  };
}
