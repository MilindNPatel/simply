"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { DATABASE_NAME, CONNECTION_STRING } = process.env;
const CONNECTION_URL = `${CONNECTION_STRING}${DATABASE_NAME}`;
mongoose_1.set("useFindAndModify", false);
mongoose_1.set("useCreateIndex", true);
mongoose_1.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose_1.connection;
db.on("error", () => {
    console.error("Error occured in db connection");
});
db.on("open", () => {
    console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
exports.default = db;
//# sourceMappingURL=dbConnection.js.map