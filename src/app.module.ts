import { Module } from "@nestjs/common";

import { LoggerModule } from "@innei/pretty-logger-nestjs";
import { ArticleModule } from "./modules/article/article.module";
import { DatabaseModule } from "./processors/database/database.module";

@Module({
  imports: [LoggerModule, DatabaseModule, ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
