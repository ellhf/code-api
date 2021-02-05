import { Database, MySQLConnector } from "../deps.ts";

import models from "../models/index.ts";
import { DB_CONNECT_OPTION } from "../config.ts";

let database: Database;

export async function initDB({ drop = false }) {
  const connection = new MySQLConnector(DB_CONNECT_OPTION);
  const db: Database = new Database(connection);
  db.link(models);
  await db.sync({ drop });
  database = db;
  return database;
}

export function getDB() {
  return database;
}

export async function closeDB() {
  await database.close();
}
