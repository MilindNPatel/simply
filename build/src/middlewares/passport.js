"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { SECRETKEY } = process.env;
const passportJwt = (req) => {
    let opts = {};
    const secretKey = SECRETKEY || "";
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = secretKey;
    passport_1.default.use(new JwtStrategy(opts, (jwt_payload, done) => {
        let data = jwt_payload ? jwt_payload : {};
        if (Object.keys(data).length > 0 &&
            data.hostName &&
            data.hostName == req.headers.host) {
            return done(null, true, "valid token");
        }
        else {
            return done(null, false, "Invalid token");
        }
    }));
};
exports.default = passportJwt;
//# sourceMappingURL=passport.js.map