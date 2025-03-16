import { DATABASE_CONNECTION_TOKEN } from "@/constants/database.constant";
import { getDatabaseConnection } from "@/utils/database.util";
import { Provider } from "@nestjs/common";

export const databaseProvider: Provider = {
  provide: DATABASE_CONNECTION_TOKEN,
  useFactory: getDatabaseConnection,
};
