import mongoose, { Connection } from "mongoose";
import { appConfig } from "@/app.config";

export function getMongodbConnectionString() {
  const mongoConfig = appConfig.mongo;
  if (mongoConfig.connectionString) return mongoConfig.connectionString;

  if (mongoConfig.srv) {
    return `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}/${mongoConfig.dbName}?authSource=${mongoConfig.authSource}&retryWrites=true&w=majority`;
  }

  return `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbName}?authSource=${mongoConfig.authSource}&retryWrites=true&w=majority`;
}

let databaseConnectionInstant: Promise<Connection> | null = null;
export async function getDatabaseConnection() {
  if (databaseConnectionInstant) {
    return databaseConnectionInstant;
  }

  databaseConnectionInstant = mongoose
    .createConnection(getMongodbConnectionString())
    .asPromise();

  return databaseConnectionInstant;
}
