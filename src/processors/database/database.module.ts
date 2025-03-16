import { Global, Module } from "@nestjs/common";
import { databaseProvider } from "./database.provider";
import { databaseModels } from "./database.models";

@Module({
  providers: [databaseProvider, ...databaseModels],
  exports: [databaseProvider, ...databaseModels],
})
@Global()
export class DatabaseModule {}
