import { cleanEnv, str, port } from "envalid";

export default function validateEnv() {
  cleanEnv(process.env, {
    CONNECTION_STRING: str(),
    DATABASE_NAME: str(),
    PORT: port(),
    SECRETKEY: str()
  });
}
