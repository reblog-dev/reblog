import { Injectable } from "@nestjs/common";
import { ArticleModel } from "./article.model";
import { InjectModel } from "@/transformers/database.transformer";
import { PaginateDto } from "@/shared/dto/paginate.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleModel)
    private readonly articleModel: MongooseModel<typeof ArticleModel>,
  ) {}

  async findByPage(options: PaginateDto) {
    const articles = await this.articleModel.paginate(
      {},
      {
        page: options.pageIndex,
        limit: options.pageSize,
        sort: {
          createdAt: -1,
        },
      },
    );

    return articles.docs;
  }
}
