import { Controller, Get, Query } from "@nestjs/common";
import { PaginateDto } from "@/shared/dto/paginate.dto";
import { ArticleService } from "./article.service";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("/")
  async findAll(@Query() options: PaginateDto) {
    return this.articleService.findByPage(options);
  }
}
