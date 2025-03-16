import { ArticleModel } from "@/modules/article/article.model";
import { getProviderByModel } from "@/transformers/database.transformer";

export const databaseModels = [ArticleModel].map((model) =>
  getProviderByModel(model),
);
