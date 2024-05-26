"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    envalid_1.cleanEnv(process.env, {
        CONNECTION_STRING: envalid_1.str(),
        DATABASE_NAME: envalid_1.str(),
        PORT: envalid_1.port(),
        SECRETKEY: envalid_1.str()
    });
}
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map