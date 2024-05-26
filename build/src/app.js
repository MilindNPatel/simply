"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const passport_1 = __importDefault(require("passport"));
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
validateEnv_1.default();
require("./config/dbConnection");
const cors = require("cors");
const swagger = require("swagger-ui-express");
const swaggerDocs = require("../swagger/swagger.json");
const history = require("connect-history-api-fallback");
const enum_1 = require("./enum");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const app = express_1.default();
const port = process.env.PORT || 8000;
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
app.use(cors());
// Passport Middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((req, res, next) => {
    middlewares_1.Passport(req);
    next();
});
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocs));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(enum_1.ROUTER_LINKS.USERS, routes_1.userRoute);
app.use(history({
    verbose: true
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.get("*", (req, res) => {
    res.status(404).end();
});
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=app.js.map