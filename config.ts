import { Algorithm, Header } from "./deps.ts";

const env = Deno.env.toObject();

export const DB_INIT_DROP = false;
export const DB_HOST = env.CODE_API_DB_HOST;
export const DB_USERNAME = env.CODE_API_DB_USERNAME;
export const DB_PASSWORD = env.CODE_API_DB_PASSWORD;
export const DB_NAME = env.CODE_API_DB_NAME;
export const DB_CONNECT_OPTION = {
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
};

export const API_VERSION = "/api/v1";

export const APP_PORT = parseInt(env.CODE_API_PORT) || 8000;

export const JWT_ALGORITHM: Algorithm = "HS256";
export const JWT_HEADER: Header = { alg: JWT_ALGORITHM, typ: "JWT" };
export const JWT_SECRET = env.CODE_API_JWT_SECRET;
