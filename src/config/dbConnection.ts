import { set, connect, connection } from "mongoose";
const { DATABASE_NAME, CONNECTION_STRING } = process.env;

const CONNECTION_URL = `${CONNECTION_STRING}${DATABASE_NAME}`;

set("useFindAndModify", false);

set("useCreateIndex", true);

connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = connection;

db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});

export default db;
