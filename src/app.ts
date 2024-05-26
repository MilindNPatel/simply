import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { json, urlencoded } from "body-parser";
import passport from "passport";
import "dotenv/config";
import validateEnv from "./utils/validateEnv";
validateEnv();
require("./config/dbConnection");
const cors = require("cors");
const swagger = require("swagger-ui-express");
const swaggerDocs = require("../swagger/swagger.json");
const history = require("connect-history-api-fallback");
import { ROUTER_LINKS } from "./enum";
import { userRoute } from "./routes";
import { Passport } from "./middlewares";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  Passport(req);
  next();
});

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocs));

app.use(ROUTER_LINKS.USERS, userRoute);

app.use(
  history({
    verbose: true,
  })
);

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("*", (req, res) => {
  res.status(404).end();
});

app.listen(port, () => console.log(`Server running on port ${port}`));
