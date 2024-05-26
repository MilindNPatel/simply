import express, { Request } from "express";
import passport from "passport";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { SECRETKEY } = process.env;

const passportJwt = (req: Request) => {
  let opts: any = {};
  const secretKey: string = SECRETKEY || "";
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secretKey;
  passport.use(
    new JwtStrategy(opts, (jwt_payload: any, done: any) => {
      let data = jwt_payload ? jwt_payload : {};
      if (
        Object.keys(data).length > 0 &&
        data.hostName &&
        data.hostName == req.headers.host
      ) {
        return done(null, true, "valid token");
      } else {
        return done(null, false, "Invalid token");
      }
    })
  );
};

export default passportJwt;
